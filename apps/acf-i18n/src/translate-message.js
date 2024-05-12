const fs = require('fs');
const translate = require('translate-google');
const { LANGUAGES } = require('./translate.constant');

// Function to recursively translate the values in an object
async function translateObject(obj, targetLanguage, targetJson) {
  const translatedObject = {};

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const targetValue = targetJson?.[key];

      if (typeof value === 'string') {
        if (key === 'message') {
          if (targetValue !== undefined && targetValue !== null && targetValue !== '') {
            translatedObject[key] = targetValue;
          } else {
            const translatedValue = await translate(value, { to: targetLanguage });
            console.log(`Translating "${value}" to "${translatedValue}"`);
            translatedObject[key] = translatedValue;
          }
        }
      } else if (typeof value === 'object') {
        translatedObject[key] = await translateObject(value, targetLanguage, targetValue);
      } else {
        translatedObject[key] = value;
      }
    }
  }

  return translatedObject;
}

// Read the JSON file
const filePath = 'locales/en/messages.json';

fs.readFile(filePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Parse the JSON data
  const englishJson = JSON.parse(data);
  for (const targetLanguage of LANGUAGES) {
    const translatedFilePath = `locales/${targetLanguage.folder}/messages.json`;

    const data = await fs.promises.readFile(translatedFilePath, 'utf8');
    console.error('Processing', targetLanguage.lang);
    // Parse the JSON data
    const targetJson = JSON.parse(data);

    // Translate the JSON object and log the result
    const translatedJson = await translateObject(englishJson, targetLanguage.lang, targetJson);
    await fs.promises.writeFile(`locales/${targetLanguage.folder}/messages.json`, JSON.stringify(translatedJson, null, 2));
  }
});
