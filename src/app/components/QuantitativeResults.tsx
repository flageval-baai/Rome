import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { getBasePath } from '@/utils/fileUtils';

interface ModelResult {
  name: string;
  completionRate: number;
  standardDeviation: number;
  logo: string;
  fullName: string;
  category: string;
  organization: string;
  link: string;
  hasReasoning: boolean;
}

type MainCategory = 'Visual Tasks' | 'Text Tasks';
type RomeSubcategory = 'overall' | 'problem-solving' | 'algorithmic-coding' | 'task-completion' | 'factuality-abstention' | 'safety';
type RomeVSubcategory = 'overall' | 'academic' | 'diagrams' | 'puzzles-game' | 'memes' | 'geolocation' | 'recognition' | 'multi-image' | 'spatial';

const Leaderboard = () => {
  const [activeMainCategory, setActiveMainCategory] = useState<MainCategory>('Text Tasks');
  const [activeRomeTab, setActiveRomeTab] = useState<RomeSubcategory>('overall');
  const [activeRomeVTab, setActiveRomeVTab] = useState<RomeVSubcategory>('overall');

  // Helper function to get model information for ROME models
  const getRomeModelInfo = (modelName: string) => {
    const modelMap: Record<string, { fullName: string, organization: string, logo: string, hasReasoning: boolean, link: string }> = {
      'DeepSeek-Chat': {
        fullName: 'DeepSeek Chat',
        organization: 'DeepSeek',
        logo: `${getBasePath()}/model_logos/deepseek_logo.png`,
        hasReasoning: true,
        link: 'https://deepseek.com'
      },
      'DeepSeek-R1': {
        fullName: 'DeepSeek R1',
        organization: 'DeepSeek',
        logo: `${getBasePath()}/model_logos/deepseek_logo.png`,
        hasReasoning: true,
        link: 'https://deepseek.com'
      },
      'Kimi-k2': {
        fullName: 'Kimi-k2',
        organization: 'Moonshot AI',
        logo: `${getBasePath()}/model_logos/kimi-logo.png`,
        hasReasoning: true,
        link: 'https://kimi.moonshot.cn'
      },
      'Phi-4-reasoning-plus': {
        fullName: 'Phi-4 Reasoning Plus',
        organization: 'Microsoft',
        logo: `${getBasePath()}/model_logos/ms.png`,
        hasReasoning: true,
        link: 'https://microsoft.com'
      },
      'claude-sonnet-4': {
        fullName: 'Claude Sonnet 4',
        organization: 'Anthropic',
        logo: `${getBasePath()}/model_logos/claude_logo.png`,
        hasReasoning: true,
        link: 'https://www.anthropic.com'
      },
      'claude-sonnet-4 (no thinking)': {
        fullName: 'Claude Sonnet 4 (No Thinking)',
        organization: 'Anthropic',
        logo: `${getBasePath()}/model_logos/claude_logo.png`,
        hasReasoning: true,
        link: 'https://www.anthropic.com'
      },
      'gemini-2.5-flash': {
        fullName: 'Gemini 2.5 Flash',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gemini-2.5-pro': {
        fullName: 'Gemini 2.5 Pro',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gemini-2.5-pro-preview-05-06': {
        fullName: 'Gemini 2.5 Pro Preview',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gpt-4.1': {
        fullName: 'GPT-4.1',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-4.1-mini': {
        fullName: 'GPT-4.1 Mini',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-high': {
        fullName: 'GPT-5 (High)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-low': {
        fullName: 'GPT-5 (Low)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-medium': {
        fullName: 'GPT-5 (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-minimal': {
        fullName: 'GPT-5 (Minimal)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-mini-high': {
        fullName: 'GPT-5 Mini (High)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-mini-low': {
        fullName: 'GPT-5 Mini (Low)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-mini-medium': {
        fullName: 'GPT-5 Mini (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-mini-minimal': {
        fullName: 'GPT-5 Mini (Minimal)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'grok-3-mini-beta': {
        fullName: 'Grok-3 Mini Beta',
        organization: 'xAI',
        logo: `${getBasePath()}/model_logos/grok.png`,
        hasReasoning: true,
        link: 'https://x.ai'
      },
      'magistral-medium-2506-thinking': {
        fullName: 'Magistral Medium (Thinking)',
        organization: 'Mistral AI',
        logo: `${getBasePath()}/model_logos/mistral.png`,
        hasReasoning: true,
        link: 'https://mistral.ai'
      },
      'o3-2025-04-16': {
        fullName: 'o3',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o4-mini-2025-04-16': {
        fullName: 'o4-mini',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'qwen3-235b-a22b (no thinking)': {
        fullName: 'Qwen3-235B (No Thinking)',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'qwen3-235b-a22b (thinking)': {
        fullName: 'Qwen3-235B (Thinking)',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'qwen3-235b-a22b-instruct-2507': {
        fullName: 'Qwen3-235B Instruct',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'qwen3-235b-a22b-thinking-2507': {
        fullName: 'Qwen3-235B Thinking',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      }
    };

    return modelMap[modelName] || {
      fullName: modelName,
      organization: 'Unknown',
      logo: `${getBasePath()}/model_logos/openai.png`,
      hasReasoning: true,
      link: '#'
    };
  };

  // ROME CSV data (from accuracy_table_text.csv)
  const romeCSVData = `model,Problem Solving,Tasks,Factuality,Programming,Safety
DeepSeek-Chat,39.18851453476334,46.59905224225613,75.0,10.784313725490197,
DeepSeek-R1,67.34844092923103,37.33465608465608,73.71794871794873,0.0,
Kimi-k2,48.299127293055605,46.25520110957004,70.51282051282051,13.725490196078432,
Phi-4-reasoning-plus,40.55618245061907,38.79838485101643,30.12820512820513,4.411764705882352,
claude-sonnet-4,68.4261770673734,100.0,68.58974358974359,16.176470588235293,
claude-sonnet-4 (no thinking),68.54485002829655,47.92084039656856,71.7948717948718,14.705882352941178,
gemini-2.5-flash,59.33814547186219,47.301523090358046,63.46153846153846,5.0,
gemini-2.5-pro,67.76790705619281,47.181769147788565,81.41025641025641,25.98039215686275,
gemini-2.5-pro-preview-05-06,54.79086435601198,100.0,82.05128205128204,,
gpt-4.1,59.23691198393308,46.891213335388095,,,
gpt-4.1-mini,57.4555364611371,46.68786651093754,,12.254901960784315,
gpt-5-high,83.18618265766699,47.02348846766322,83.97435897435896,65.19607843137254,
gpt-5-low,79.49551482463042,46.64303693429907,82.6923076923077,59.31372549019608,
gpt-5-medium,83.35506905047828,46.551214876457585,83.97435897435898,65.19607843137256,
gpt-5-minimal,39.30615656963021,46.609968151230284,74.35897435897436,24.50980392156863,
gpt-5-mini-high,77.48533841981035,46.6908743000976,64.74358974358975,67.6470588235294,
gpt-5-mini-low,66.53796482255994,46.85814455231931,60.25641025641026,49.509803921568626,
gpt-5-mini-medium,74.47004793159138,46.88382904402322,64.1025641025641,24.01960784313725,
gpt-5-mini-minimal,39.526701416207715,46.091462474957616,59.61538461538461,33.333333333333336,
grok-3-mini-beta,51.31370605408091,46.86167616992859,64.1025641025641,13.23529411764706,
magistral-medium-2506-thinking,42.374697192430325,98.24561403508771,62.82051282051282,,
o3-2025-04-16,,46.119073303539324,,45.588235294117645,
o4-mini-2025-04-16,,46.19729271939287,,39.21568627450981,
qwen3-235b-a22b (no thinking),43.41428475299185,45.819527919042486,46.794871794871796,11.764705882352942,
qwen3-235b-a22b (thinking),50.8650332311897,46.11586274207633,50.641025641025635,18.137254901960787,
qwen3-235b-a22b-instruct-2507,61.133004989854655,46.80677556891149,57.6923076923077,14.215686274509803,
qwen3-235b-a22b-thinking-2507,64.20034214667274,47.09379976370267,63.46153846153846,12.745098039215685`;

  // Parse ROME CSV data
  const parseRomeCSVData = (): Record<RomeSubcategory, ModelResult[]> => {
    const lines = romeCSVData.trim().split('\n');
    const headers = lines[0].split(',');
    const models = lines.slice(1);

    const categoryMapping: Record<string, RomeSubcategory> = {
      'Problem Solving': 'problem-solving',
      'Tasks': 'task-completion',
      'Factuality': 'factuality-abstention',
      'Programming': 'algorithmic-coding',
      'Safety': 'safety'
    };

    const result: Record<RomeSubcategory, ModelResult[]> = {
      overall: [],
      'problem-solving': [],
      'task-completion': [],
      'factuality-abstention': [],
      'algorithmic-coding': [],
      safety: []
    };

    // Process each model
    models.forEach(modelLine => {
      const values = modelLine.split(',');
      const modelName = values[0];
      const modelInfo = getRomeModelInfo(modelName);

      const scores: number[] = [];
      
      // Process each category
      headers.slice(1).forEach((header, headerIndex) => {
        const categoryKey = categoryMapping[header];
        if (categoryKey && values[headerIndex + 1] && values[headerIndex + 1].trim() !== '') {
          const accuracy = parseFloat(values[headerIndex + 1]);
          scores.push(accuracy);
          
          result[categoryKey].push({
            name: modelName,
            completionRate: Math.round(accuracy * 10) / 10, // Round to 1 decimal place
            standardDeviation: 1.5, // Default standard deviation since not provided in CSV
            logo: modelInfo.logo,
            fullName: modelInfo.fullName,
            category: categoryKey,
            organization: modelInfo.organization,
            link: modelInfo.link,
            hasReasoning: modelInfo.hasReasoning
          });
        }
      });

      // Calculate overall score as average of available scores
      if (scores.length > 0) {
        const overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        result.overall.push({
          name: modelName,
          completionRate: Math.round(overallScore * 10) / 10, // Round to 1 decimal place
          standardDeviation: 1.5,
          logo: modelInfo.logo,
          fullName: modelInfo.fullName,
          category: 'overall',
          organization: modelInfo.organization,
          link: modelInfo.link,
          hasReasoning: modelInfo.hasReasoning
        });
      }
    });

    return result;
  };

  // Rome dataset - Text-based reasoning tasks parsed from CSV
  const romeData: Record<RomeSubcategory, ModelResult[]> = parseRomeCSVData();

  // Helper function to parse accuracy string (e.g., "61.1 ± 0.6")
  const parseAccuracy = (accuracyStr: string): { accuracy: number, std: number } => {
    const parts = accuracyStr.split(' ± ');
    return {
      accuracy: parseFloat(parts[0]),
      std: parseFloat(parts[1])
    };
  };

  // Helper function to get model information based on model name
  const getModelInfo = (modelName: string) => {
    const modelMap: Record<string, { fullName: string, organization: string, logo: string, hasReasoning: boolean, link: string }> = {
      'gemini-2.5-pro': {
        fullName: 'Gemini 2.5 Pro',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gemini-2.5-flash-thinking': {
        fullName: 'Gemini 2.5 Flash (Thinking)',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gemini-2.5-flash': {
        fullName: 'Gemini 2.5 Flash',
        organization: 'Google',
        logo: `${getBasePath()}/model_logos/google-gemini-icon.png`,
        hasReasoning: true,
        link: 'https://deepmind.google/technologies/gemini/'
      },
      'gpt-5-high': {
        fullName: 'GPT-5 (High)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-medium': {
        fullName: 'GPT-5 (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-low': {
        fullName: 'GPT-5 (Low)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-minimal': {
        fullName: 'GPT-5 (Minimal)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'gpt-5-mini-medium': {
        fullName: 'GPT-5 Mini (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o3-high': {
        fullName: 'o3 (High)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o3-medium': {
        fullName: 'o3 (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o3-low': {
        fullName: 'o3 (Low)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o4-mini-high': {
        fullName: 'o4-mini (High)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o4-mini-medium': {
        fullName: 'o4-mini (Medium)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'o4-mini-low': {
        fullName: 'o4-mini (Low)',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'claude-sonnet-4-thinking': {
        fullName: 'Claude Sonnet 4 (Thinking)',
        organization: 'Anthropic',
        logo: `${getBasePath()}/model_logos/claude_logo.png`,
        hasReasoning: true,
        link: 'https://www.anthropic.com'
      },
      'claude-sonnet-4': {
        fullName: 'Claude Sonnet 4',
        organization: 'Anthropic',
        logo: `${getBasePath()}/model_logos/claude_logo.png`,
        hasReasoning: true,
        link: 'https://www.anthropic.com'
      },
      'gpt-4-1': {
        fullName: 'GPT-4.1',
        organization: 'OpenAI',
        logo: `${getBasePath()}/model_logos/openai_reasoning.png`,
        hasReasoning: true,
        link: 'https://openai.com'
      },
      'QVQ-72B': {
        fullName: 'QVQ-72B',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'Qwen2.5-VL-72B': {
        fullName: 'Qwen2.5-VL-72B',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'Qwen2.5-VL-7B': {
        fullName: 'Qwen2.5-VL-7B',
        organization: 'Qwen',
        logo: `${getBasePath()}/model_logos/qwen.png`,
        hasReasoning: true,
        link: 'https://qwenlm.github.io'
      },
      'llama-4-maverick': {
        fullName: 'Llama 4 Maverick',
        organization: 'Meta',
        logo: `${getBasePath()}/model_logos/meta.png`,
        hasReasoning: true,
        link: 'https://llama.meta.com'
      },
      'mistral-medium-3': {
        fullName: 'Mistral Medium 3',
        organization: 'Mistral AI',
        logo: `${getBasePath()}/model_logos/mistral.png`,
        hasReasoning: true,
        link: 'https://mistral.ai'
      },
      'mistral-medium-3-1': {
        fullName: 'Mistral Medium 3.1',
        organization: 'Mistral AI',
        logo: `${getBasePath()}/model_logos/mistral.png`,
        hasReasoning: true,
        link: 'https://mistral.ai'
      }
    };

    return modelMap[modelName] || {
      fullName: modelName,
      organization: 'Unknown',
      logo: `${getBasePath()}/model_logos/openai.png`,
      hasReasoning: true,
      link: '#'
    };
  };

  // CSV data (hardcoded for now - in production this would be loaded from the CSV file)
  const csvData = `Model,Puzzles Games,Spatial,Recognition,Multi,Diagrams,Geo,Academic,Memes,Overall
gemini-2.5-pro,40.9 ± 8.2,39.3 ± 1.2,58.7 ± 4.5,52.8 ± 3.8,63.5 ± 3.8,70.2 ± 2.7,77.7 ± 2.9,82.5 ± 4.9,61.1 ± 0.6
gemini-2.5-flash-thinking,28.0 ± 6.6,31.4 ± 2.0,46.6 ± 1.7,44.2 ± 1.4,56.4 ± 3.1,58.0 ± 3.5,67.6 ± 4.3,66.7 ± 2.4,50.3 ± 1.3
gemini-2.5-flash,21.2 ± 4.8,33.6 ± 2.4,40.2 ± 2.7,46.7 ± 2.4,51.3 ± 1.8,54.3 ± 1.5,62.2 ± 1.9,50.0 ± 8.2,45.5 ± 1.3
gpt-5-high,43.2 ± 2.5,42.1 ± 5.8,48.9 ± 4.7,62.5 ± 2.8,59.0 ± 3.1,69.0 ± 0.9,68.9 ± 2.3,82.5 ± 4.3,59.6 ± 1.2
gpt-5-medium,39.4 ± 2.1,40.7 ± 2.4,49.2 ± 6.2,66.7 ± 4.1,56.4 ± 1.8,73.0 ± 5.1,71.6 ± 4.5,81.7 ± 1.7,60.0 ± 1.3
gpt-5-low,34.8 ± 2.6,33.6 ± 5.5,52.3 ± 3.3,58.3 ± 3.7,59.6 ± 2.1,70.2 ± 2.9,71.6 ± 2.3,80.0 ± 4.1,57.9 ± 0.9
gpt-5-minimal,21.2 ± 3.7,28.6 ± 3.5,46.2 ± 3.3,51.7 ± 3.7,25.6 ± 4.1,63.9 ± 2.3,31.1 ± 6.2,63.3 ± 4.1,41.4 ± 0.8
gpt-5-mini-medium,39.4 ± 0.0,32.9 ± 7.1,46.2 ± 5.8,46.7 ± 5.3,53.2 ± 4.9,52.8 ± 2.8,69.6 ± 3.5,72.5 ± 2.8,51.7 ± 2.3
o3-high,37.9 ± 2.6,39.3 ± 4.7,48.5 ± 6.2,60.0 ± 3.3,51.9 ± 5.2,67.5 ± 1.8,65.5 ± 5.5,77.5 ± 4.3,56.1 ± 1.7
o3-medium,34.8 ± 5.0,38.6 ± 1.4,51.9 ± 2.0,65.0 ± 5.0,47.4 ± 2.9,67.0 ± 1.6,68.2 ± 4.0,75.8 ± 2.8,56.1 ± 1.9
o3-low,32.6 ± 5.8,36.4 ± 3.7,53.8 ± 1.3,61.7 ± 2.9,50.6 ± 2.1,66.5 ± 3.3,64.2 ± 6.2,76.7 ± 2.4,55.3 ± 0.9
o4-mini-high,40.2 ± 3.9,37.9 ± 3.1,40.2 ± 1.3,51.7 ± 3.7,48.7 ± 3.6,54.0 ± 3.6,65.5 ± 2.2,77.5 ± 2.8,51.8 ± 1.0
o4-mini-medium,37.9 ± 4.5,32.1 ± 6.5,35.6 ± 2.5,54.2 ± 3.6,50.0 ± 2.9,49.4 ± 2.0,63.5 ± 3.0,78.3 ± 2.9,49.8 ± 1.1
o4-mini-low,36.4 ± 4.8,31.4 ± 3.5,40.2 ± 2.5,43.3 ± 7.1,48.1 ± 3.8,47.7 ± 3.1,57.4 ± 4.8,75.8 ± 3.6,47.3 ± 1.6
claude-sonnet-4-thinking,27.3 ± 4.8,26.4 ± 3.1,22.7 ± 1.1,35.4 ± 5.2,49.4 ± 3.3,27.6 ± 0.5,68.2 ± 2.9,54.2 ± 6.0,38.9 ± 1.5
claude-sonnet-4,22.7 ± 2.6,27.9 ± 2.4,17.8 ± 2.0,29.2 ± 2.8,46.2 ± 1.8,32.1 ± 2.0,58.1 ± 2.3,47.5 ± 2.8,35.5 ± 1.1
gpt-4-1,24.2 ± 4.3,34.3 ± 3.5,54.9 ± 4.7,57.5 ± 4.3,46.8 ± 3.3,60.8 ± 0.6,50.0 ± 1.4,67.5 ± 4.9,49.5 ± 1.4
QVQ-72B,17.2 ± 3.5,17.1 ± 2.0,10.6 ± 1.3,27.5 ± 2.8,37.8 ± 2.8,33.5 ± 3.1,41.9 ± 5.9,19.1 ± 1.6,26.7 ± 1.1
Qwen2.5-VL-72B,8.3 ± 3.9,28.6 ± 0.0,25.8 ± 2.6,33.3 ± 0.0,41.0 ± 0.0,28.7 ± 1.5,37.8 ± 0.0,23.3 ± 0.0,28.8 ± 0.1
Qwen2.5-VL-7B,8.3 ± 4.5,22.9 ± 4.0,13.6 ± 3.4,18.3 ± 5.0,12.8 ± 6.3,22.4 ± 2.8,20.9 ± 2.2,13.3 ± 4.1,16.9 ± 1.4
llama-4-maverick,12.9 ± 1.3,27.1 ± 5.2,15.2 ± 2.8,31.7 ± 3.7,39.7 ± 2.9,29.5 ± 0.8,43.9 ± 4.8,19.2 ± 1.4,28.0 ± 0.8
mistral-medium-3,15.9 ± 4.5,25.0 ± 4.2,15.9 ± 3.1,20.8 ± 3.6,30.1 ± 3.8,29.3 ± 2.0,39.2 ± 1.4,23.3 ± 2.4,25.5 ± 0.3
mistral-medium-3-1,15.9 ± 6.9,22.9 ± 4.5,16.7 ± 4.7,20.0 ± 4.1,27.6 ± 2.1,28.4 ± 2.4,48.0 ± 7.5,27.5 ± 6.0,26.3 ± 0.5`;

  // Parse CSV and create romeVData
  const parseCSVToRomeVData = (): Record<RomeVSubcategory, ModelResult[]> => {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    const models = lines.slice(1);

    const categoryMapping: Record<string, RomeVSubcategory> = {
      'Overall': 'overall',
      'Academic': 'academic', 
      'Diagrams': 'diagrams',
      'Puzzles Games': 'puzzles-game',
      'Memes': 'memes',
      'Geo': 'geolocation',
      'Recognition': 'recognition',
      'Multi': 'multi-image',
      'Spatial': 'spatial'
    };

    const result: Record<RomeVSubcategory, ModelResult[]> = {
      overall: [],
      academic: [],
      diagrams: [],
      'puzzles-game': [],
      memes: [],
      geolocation: [],
      recognition: [],
      'multi-image': [],
      spatial: []
    };

    // Process each model
    models.forEach(modelLine => {
      const values = modelLine.split(',');
      const modelName = values[0];
      const modelInfo = getModelInfo(modelName);

      // Process each category
      headers.slice(1).forEach((header, headerIndex) => {
        const categoryKey = categoryMapping[header];
        if (categoryKey && values[headerIndex + 1]) {
          const { accuracy, std } = parseAccuracy(values[headerIndex + 1]);
          
          result[categoryKey].push({
            name: modelName,
            completionRate: accuracy,
            standardDeviation: std,
            logo: modelInfo.logo,
            fullName: modelInfo.fullName,
            category: categoryKey,
            organization: modelInfo.organization,
            link: modelInfo.link,
            hasReasoning: modelInfo.hasReasoning
          });
        }
      });
    });

    return result;
  };

  // Rome-V dataset - Visual reasoning tasks parsed from CSV
  const romeVData: Record<RomeVSubcategory, ModelResult[]> = parseCSVToRomeVData();

  // 判断两个模型是否应该并列
  const shouldTie = (model1: ModelResult, model2: ModelResult) => {
    const acc1 = model1.completionRate;
    const std1 = model1.standardDeviation;
    const acc2 = model2.completionRate;
    const std2 = model2.standardDeviation;
    
    // accuracy_2在accuracy_1-std，accuracy_1+std范围内
    const condition1 = acc2 >= (acc1 - std1) && acc2 <= (acc1 + std1);
    // accuracy_1在accuracy_2-std，accuracy_2+std范围内
    const condition2 = acc1 >= (acc2 - std2) && acc1 <= (acc2 + std2);
    
    return condition1 && condition2;
  };

  // 将模型按并列规则分组并分配排名
  const sortAndRankModels = (models: ModelResult[]) => {
    // 首先按accuracy排序
    const sorted = [...models].sort((a, b) => b.completionRate - a.completionRate);
    
    if (sorted.length === 0) return [];
    
    const groups: ModelResult[][] = [];
    let currentGroup = [sorted[0]];
    
    for (let i = 1; i < sorted.length; i++) {
      const currentModel = sorted[i];
      
      // 检查当前模型是否与当前组中的所有模型都满足并列条件
      const canJoinGroup = currentGroup.every(groupModel => shouldTie(currentModel, groupModel));
      
      if (canJoinGroup) {
        // 还需要检查加入这个模型后，组内所有模型是否仍然满足两两并列的条件
        const potentialGroup = [...currentGroup, currentModel];
        const allTied = potentialGroup.every((model1, index1) => 
          potentialGroup.every((model2, index2) => 
            index1 === index2 || shouldTie(model1, model2)
          )
        );
        
        if (allTied) {
          currentGroup.push(currentModel);
        } else {
          groups.push(currentGroup);
          currentGroup = [currentModel];
        }
      } else {
        groups.push(currentGroup);
        currentGroup = [currentModel];
      }
    }
    
    groups.push(currentGroup);
    
    // 分配排名
    const rankedModels: (ModelResult & { rank: number })[] = [];
    let currentRank = 1;
    
    for (const group of groups) {
      for (const model of group) {
        rankedModels.push({ ...model, rank: currentRank });
      }
      currentRank += group.length;
    }
    
    return rankedModels;
  };

  // Get organization color
  const getOrganizationColor = (organization: string) => {
    const colors = {
      'OpenAI': 'bg-blue-100 text-blue-700 border-blue-200',
      'Anthropic': 'bg-orange-100 text-orange-700 border-orange-200',
      'Google': 'bg-green-100 text-green-700 border-green-200',
      'DeepSeek': 'bg-purple-100 text-purple-700 border-purple-200',
      'Qwen': 'bg-teal-100 text-teal-700 border-teal-200',
      'Meta': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Mistral AI': 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return colors[organization as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Get current data based on active category and tab
  const getCurrentData = () => {
    if (activeMainCategory === 'Text Tasks') {
      return sortAndRankModels(romeData[activeRomeTab]);
    } else {
      return sortAndRankModels(romeVData[activeRomeVTab]);
    }
  };

  const currentData = getCurrentData();

  return (
    <section className="w-full mb-12">
      <div className="max-w-4xl mx-auto px-4 py-6 bg-white rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {/* {activeMainCategory === 'rome' ? 'ROME' : 'ROME-V'} Leaderboard */}
            Leaderboard
          </h2>
          <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
        
        {/* Main Category Selection */}
        <div className="mb-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveMainCategory('Text Tasks')}
              className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
                activeMainCategory === 'Text Tasks'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Text Tasks
            </button>
            <button
              onClick={() => setActiveMainCategory('Visual Tasks')}
              className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
                activeMainCategory === 'Visual Tasks'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Visual Tasks
            </button>
          </div>
        </div>

        {/* Task Types Illustration */}
        <div className="mb-8">
          {/* <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
            {activeMainCategory === 'rome' ? 'Text-based Reasoning Tasks' : 'Visual Reasoning Tasks'}
          </h3> */}
          {activeMainCategory === 'Text Tasks' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-1">Problem solving</h4>
                <p className="text-xs text-gray-700">college course questions, word
                  puzzles, and deciphering</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-1">Algorithmic Coding</h4>
                <p className="text-xs text-gray-700">recent released code problems</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-1">Task Completion</h4>
                <p className="text-xs text-gray-700">instruction following, multi-turn instruction following, long-Context Understanding</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-1">Factuality and Abstention</h4>
                <p className="text-xs text-gray-700"> long-tailed knowledge </p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-1">Safety</h4>
                <p className="text-xs text-gray-700"> harmful generation and jailbreaking </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <h4 className="font-medium text-emerald-900 mb-1">Academic</h4>
                <p className="text-xs text-gray-700">questions from college courses</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                <h4 className="font-medium text-pink-900 mb-1">Diagrams</h4>
                <p className="text-xs text-gray-700">charts and figures collected from recent scientific
                papers, reports, or blog posts</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                <h4 className="font-medium text-indigo-900 mb-1">Puzzles and game</h4>
                <p className="text-xs text-gray-700">raven tests, Rebus puzzles and game play</p>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                <h4 className="font-medium text-teal-900 mb-1">Memes</h4>
                <p className="text-xs text-gray-700">recreated memes</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-900 mb-1">Geo</h4>
                <p className="text-xs text-gray-700">geolocation Inference</p>
              </div>
              <div className="bg-rose-50 p-3 rounded-lg border border-rose-200">
                <h4 className="font-medium text-rose-900 mb-1">Recognition</h4>
                <p className="text-xs text-gray-700">fine-grained recognition</p>
              </div>
              <div className="bg-violet-50 p-3 rounded-lg border border-violet-200">
                <h4 className="font-medium text-violet-900 mb-1">Multi-image</h4>
                <p className="text-xs text-gray-700">find-the-difference or video frame reordering.</p>
              </div>
              <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-200">
                <h4 className="font-medium text-cyan-900 mb-1">Spatial</h4>
                <p className="text-xs text-gray-700">elative positions, depths/distances, height, etc</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-8">
          {/* <div className="w-full">
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              <span className="font-semibold">Metric: Success Rate.</span> Defined by the ratio of the number of tasks passing the test cases to the total number of tasks.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2">Evaluation Methodology</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>SELECT queries: Compare execution results with golden SQL outputs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Management SQLs: Verify through comprehensive test cases</span>
                </li>
              </ul>
            </div>
          </div> */}
          
          <div className="w-full">
            {/* <div className="text-xs text-gray-600 text-right mb-2">
              Last Updated: 06/09/2025
            </div> */}

            {/* Subcategory Tabs */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {activeMainCategory === 'Visual Tasks' ? (
                [
                  { id: 'overall', label: 'Overall', colors: 'bg-gray-100 text-gray-700 border-gray-200' },
                  { id: 'academic', label: 'Academic', colors: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                  { id: 'diagrams', label: 'Diagrams', colors: 'bg-pink-100 text-pink-700 border-pink-200' },
                  { id: 'puzzles-game', label: 'Puzzles and Game', colors: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
                  { id: 'memes', label: 'Memes', colors: 'bg-teal-100 text-teal-700 border-teal-200' },
                  { id: 'geolocation', label: 'Geolocation', colors: 'bg-amber-100 text-amber-700 border-amber-200' },
                  { id: 'recognition', label: 'Recognition', colors: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
                  { id: 'multi-image', label: 'Multi-image', colors: 'bg-violet-100 text-violet-700 border-violet-200' },
                  { id: 'spatial', label: 'Spatial', colors: 'bg-rose-100 text-rose-700 border-rose-200' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRomeVTab(tab.id as RomeVSubcategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      activeRomeVTab === tab.id
                        ? tab.colors
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))
              ) : (
                [
                  { id: 'overall', label: 'Overall', colors: 'bg-gray-100 text-gray-700 border-gray-200' },
                  { id: 'problem-solving', label: 'Problem Solving', colors: 'bg-blue-100 text-blue-700 border-blue-200' },
                  { id: 'algorithmic-coding', label: 'Algorithmic Coding', colors: 'bg-green-100 text-green-700 border-green-200' },
                  { id: 'task-completion', label: 'Task Completion', colors: 'bg-orange-100 text-orange-700 border-orange-200' },
                  { id: 'factuality-abstention', label: 'Factuality and Abstention', colors: 'bg-purple-100 text-purple-700 border-purple-200' },
                  { id: 'safety', label: 'Safety', colors: 'bg-red-100 text-red-700 border-red-200' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRomeTab(tab.id as RomeSubcategory)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      activeRomeTab === tab.id
                        ? tab.colors
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))
              )}
            </div>
            
            <div className="relative w-full overflow-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="h-10 px-4 text-center align-middle font-medium text-gray-600">
                      Rank
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-gray-600">
                      Model
                    </th>
                    <th className="h-10 px-4 text-center align-middle font-medium text-gray-600">
                      Organization
                    </th>
                    <th className="h-10 px-4 text-center align-middle font-medium text-gray-600">
                      Accuracy ± std(avg@4) <ArrowDown className="inline h-4 w-4 text-gray-400" />
                    </th>
                    <th className="h-10 px-4 text-center align-middle font-medium text-gray-600">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((model, index) => (
                      <tr 
                        key={model.name}
                        className={`border-b hover:bg-gray-50 transition-colors ${
                          model.rank === 1 ? 'bg-blue-50' : 
                          activeMainCategory === 'Text Tasks' ? 'bg-blue-50/30' : 'bg-purple-50/30'
                        }`}
                      >
                        <td className="py-2 px-4 align-middle text-center">
                          {model.completionRate > 0 ? (
                            <div className="flex items-center justify-center gap-1">
                              {model.rank === 1 && <span className="text-yellow-500">🥇</span>}
                              {model.rank === 2 && <span className="text-gray-400">🥈</span>}
                              {model.rank === 3 && <span className="text-amber-600">🥉</span>}
                              <span className={`font-medium ${
                                model.rank <= 3 ? 'text-gray-700' : 'text-gray-500'
                              }`}>
                                {model.rank}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-2 px-4 align-middle">
                          <div className="flex items-center gap-3 justify-start">
                            <img
                              src={model.logo}
                              alt={`${model.fullName} logo`}
                              className={`w-5 h-5 object-contain ${!model.hasReasoning ? 'brightness-0' : ''}`}
                            />
                            <span className="font-medium">{model.fullName}</span>
                          </div>
                        </td>
                        <td className="py-2 px-4 align-middle text-center"> 
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getOrganizationColor(model.organization)}`}>
                            {model.organization}
                          </span>
                        </td>
                        <td className="py-2 px-4 align-middle text-center font-medium">
                          {model.completionRate > 0 ? `${model.completionRate.toFixed(1)} ± ${model.standardDeviation.toFixed(1)}` : 'N/A'}
                        </td>
                        <td className="py-2 px-4 align-middle text-center">
                          <a 
                            href={model.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline text-lg"
                            title="Visit Model Page"
                          >
                            🔗
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        No results available for this category yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <p className="mt-4 text-sm text-gray-600">
              <span className="font-medium">Note:</span> {activeMainCategory === 'Text Tasks' 
                ? 'ROME evaluates text-based reasoning capabilities across algorithmic coding, problem solving, mathematical reasoning, and logical inference tasks.'
                : 'ROME-V evaluates visual reasoning capabilities across geographic understanding, meme interpretation, spatial reasoning, visual analysis, and chart comprehension tasks.'
              } 
            </p>
            <p className="mt-4 text-sm text-gray-600">
              <span className="font-medium">Evaluation:</span> Accuracy is calculated as the percentage of tasks correctly completed. 
              {activeMainCategory === 'Text Tasks' 
                ? ' Tasks include code generation, mathematical proofs, logical deduction, and complex problem-solving scenarios.'
                : ' Tasks involve interpreting images, understanding visual relationships, analyzing charts, and processing multimodal information.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;