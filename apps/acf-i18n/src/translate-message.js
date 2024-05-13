const fs = require('fs');
const { Translate } = require('@google-cloud/translate').v2;
const { LANGUAGES } = require('./translate.constant');

// Creates a client
const translate = new Translate();

async function translateStringValue(value, targetValue, targetLanguage) {
  if (targetValue) {
    return targetValue;
  } else {
    value = value.replaceAll(/(\$\d+)/g, '{{$1}}');

    let [translatedValue] = await translate.translate(value, { from: 'en', to: targetLanguage });
    console.log(`Translating "${value}" to "${translatedValue}"`);
    return translatedValue.replaceAll(/{{(\$\d+)}}/g, '$1');
  }
}

// Function to recursively translate the values in an object
async function translateObject(obj, targetLanguage, targetJson) {
  const translatedObject = {};

  for (const key in obj) {
    const value = obj[key];
    const targetValue = targetJson?.[key];
    if (typeof value === 'string' && key === 'message') {
      translatedObject[key] = await translateStringValue(value, targetValue, targetLanguage);
    } else if (typeof value === 'object') {
      translatedObject[key] = await translateObject(value, targetLanguage, targetValue);
    }
  }

  return translatedObject;
}

async function start() {
  // Read the JSON file
  const filePath = 'locales/en/messages.json';
  const englishJson = await fs.promises.readFile(filePath, 'utf8');

  for (const { lang, folder } of LANGUAGES) {
    console.error('------------- Processing :: ', folder, lang);
    const translatedFilePath = `locales/${folder}/messages.json`;

    const targetJson = await fs.promises.readFile(translatedFilePath, 'utf8').catch(() => {
      fs.promises.mkdir(`locales/${folder}`, { recursive: true });
    });
    // Translate the JSON object and log the result
    const translatedJson = await translateObject(JSON.parse(englishJson), lang, JSON.parse(targetJson || '{}'));
    await fs.promises.writeFile(`locales/${folder}/messages.json`, JSON.stringify(translatedJson, null, 2));
  }
}

start();
