import axios from 'axios';
import { 
  AnthropicRequest, 
  AnthropicResponse, 
  CommitRequest, 
  CommandRequest 
} from '../types';

// System prompts
const COMMIT_SYSTEM_PROMPT = `You are an AI assistant that helps developers write clear and meaningful git commit messages.
Follow these rules:
1. Use the conventional commit format: <type>(<scope>): <description>
2. Keep the subject line under 72 characters
3. Use the imperative mood ("add" not "added")
4. Don't end the subject line with a period
5. Focus on WHY and WHAT, not HOW
6. If there are breaking changes, add BREAKING CHANGE: in the body

Types: feat, fix, docs, style, refactor, perf, test, chore, ci, build

Return ONLY the commit message, without any prefixes or explanations.`;

const COMMAND_SYSTEM_PROMPT = `You are a Git command suggestion assistant. Given a natural language description of what the user wants to do, suggest the appropriate Git command(s).

Rules:
1. Always provide clear, concise commands
2. Include a brief explanation of what each command does
3. If multiple steps are needed, number them
4. If there are alternative approaches, mention them
5. Include any relevant flags or options that might be helpful
6. Warn about any potential risks or things to be careful about

Format your response as:
COMMAND: <the command>
EXPLANATION: <brief explanation>
NOTE: <optional notes/warnings>
`;

// Helper function to get API key
function getApiKey(): string {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Anthropic API key');
  }
  return apiKey;
}

// Helper function to get model
function getModel(): string {
  return process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022';
}

// Clean commit message function
function cleanCommitMessage(message: string): string {
  // Remove any prefixes like "Based on the changes..."
  const types = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'ci', 'build'];
  
  for (const type of types) {
    const idx = message.indexOf(type);
    if (idx !== -1) {
      return message.substring(idx).trim();
    }
  }
  
  return message.trim();
}

// Function to call Anthropic API
async function callAnthropicApi(request: AnthropicRequest): Promise<string> {
  const apiKey = getApiKey();
  
  try {
    const response = await axios.post<AnthropicResponse>(
      'https://api.anthropic.com/v1/messages',
      request,
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      }
    );

    const textContent = response.data.content.find(c => c.type === 'text');
    if (!textContent) {
      throw new Error('No text content in response');
    }

    return textContent.text;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Anthropic API error: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

// Function to generate a single commit message
export async function generateCommitMessage(req: CommitRequest): Promise<string> {
  const suggestions = await generateCommitSuggestions(req, 1);
  return suggestions[0] || '';
}

// Function to generate multiple commit message suggestions
export async function generateCommitSuggestions(
  req: CommitRequest,
  count: number = 3
): Promise<string[]> {
  const model = getModel();
  const suggestions: string[] = [];

  let prompt = 'Here are the changes to commit:\n\n';

  // Add file changes summary
  if (req.changes.added.length > 0) {
    prompt += 'Added files:\n';
    for (const file of req.changes.added) {
      prompt += `  + ${file}\n`;
    }
  }

  if (req.changes.modified.length > 0) {
    prompt += '\nModified files:\n';
    for (const file of req.changes.modified) {
      prompt += `  * ${file}\n`;
    }
  }

  if (req.changes.deleted.length > 0) {
    prompt += '\nDeleted files:\n';
    for (const file of req.changes.deleted) {
      prompt += `  - ${file}\n`;
    }
  }

  if (req.changes.renamed.length > 0) {
    prompt += '\nRenamed files:\n';
    for (const [old, newName] of req.changes.renamed) {
      prompt += `  ${old} -> ${newName}\n`;
    }
  }

  // Add the diff
  prompt += '\nHere\'s the detailed diff:\n';
  prompt += req.diff;

  prompt += '\nPlease generate a commit message following the conventional commit format.';

  for (let i = 0; i < count; i++) {
    console.log(`Generating commit suggestion ${i + 1}/${count}`);

    const request: AnthropicRequest = {
      model,
      max_tokens: 200,
      temperature: 0.7, // Increased temperature for more varied suggestions
      system: COMMIT_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    };

    const message = await callAnthropicApi(request);
    suggestions.push(cleanCommitMessage(message));
  }

  return suggestions;
}

// Function to suggest git commands
export async function suggestCommand(req: CommandRequest): Promise<string> {
  const model = getModel();

  const request: AnthropicRequest = {
    model,
    max_tokens: 500,
    temperature: 0.2, // Lower temperature for more focused suggestions
    system: COMMAND_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: req.description,
          },
        ],
      },
    ],
  };

  return await callAnthropicApi(request);
}
