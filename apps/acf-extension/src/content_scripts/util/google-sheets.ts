import { Configuration } from '@dhruv-techapps/acf-common';
import { Logger } from '@dhruv-techapps/core-common';
import Session from './session';
import { GoogleSheetsService } from '@dhruv-techapps/acf-service';

export type Sheets = {
  [index: string]: {
    startRange: string;
    endRange: string;
    sessionCount?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: Array<any>;
  };
};
enum Dimension {
  ROWS,
  COLUMNS,
}
type ValueRange = {
  range: string;
  majorDimension: Dimension;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Array<any>;
};

const GOOGLE_SHEETS_REGEX = /^googlesheets::/i;

export default class GoogleSheets {
  getSheets(config: Configuration, batchHighestRepeat: number) {
    const sheets = new Map<string, Set<string>>();
    let sessionCount: number | undefined;
    config.actions
      .map(({ elementFinder, value, addon }) => {
        const result = [];
        if (value && GOOGLE_SHEETS_REGEX.test(value)) {
          result.push(value.replace(GOOGLE_SHEETS_REGEX, ''));
        }
        if (GOOGLE_SHEETS_REGEX.test(elementFinder)) {
          result.push(elementFinder.replace(GOOGLE_SHEETS_REGEX, ''));
        }
        if (addon) {
          if (GOOGLE_SHEETS_REGEX.test(addon.value)) {
            result.push(addon.value.replace(GOOGLE_SHEETS_REGEX, ''));
          }
          if (GOOGLE_SHEETS_REGEX.test(addon.elementFinder)) {
            result.push(addon.elementFinder.replace(GOOGLE_SHEETS_REGEX, ''));
          }
        }
        return result;
      })
      .filter((googleSheets) => googleSheets.length)
      .forEach((googleSheets) => {
        googleSheets.forEach((value) => {
          const [sheetName, range] = value.split('!');
          const ranges = sheets.get(sheetName) || new Set<string>();
          if (value.includes('<batchRepeat>')) {
            ranges.add(range.replace('<batchRepeat>', '1'));
            ranges.add(range.replace('<batchRepeat>', String(batchHighestRepeat + 1)));
          } else if (value.includes('<sessionCount>')) {
            sessionCount = sessionCount || (sessionCount = Session.getCount());
            ranges.add(range.replace('<sessionCount>', String(sessionCount)));
          } else {
            ranges.add(range);
          }
          sheets.set(sheetName, ranges);
        });
      });
    return { sheets, sessionCount };
  }

  transformSheets(sheets: Map<string, Set<string> | string>) {
    sheets.forEach((ranges, sheetName) => {
      let lowestColumn = 'ZZ';
      let highestColumn = 'A';
      let lowestRow = 999;
      let hightestRow = 1;
      if (ranges instanceof Set) {
        ranges.forEach((range) => {
          const regexResult = /(\D+)(\d+)/.exec(range);
          if (regexResult) {
            const [, column, row] = regexResult;
            const rowIndex = Number(row);
            // Highest Range
            if (highestColumn.length < column.length || highestColumn < column) {
              highestColumn = column;
            }
            if (hightestRow < rowIndex) {
              hightestRow = rowIndex;
            }
            // Lowest Range
            if (lowestColumn.length > column.length || lowestColumn > column) {
              lowestColumn = column;
            }
            if (lowestRow > rowIndex) {
              lowestRow = rowIndex;
            }
          }
        });
      }
      sheets.set(sheetName, `${lowestColumn}${lowestRow}:${highestColumn}${hightestRow}`);
    });
  }

  transformResult(result: Array<ValueRange>, sessionCount?: number): Sheets {
    return result.reduce((a: Sheets, c: ValueRange) => {
      const { range, values } = c;
      const [sheetName, ranges] = range.split('!');
      const [startRange, endRange] = ranges.split(':');
      a[sheetName] = { startRange, endRange, values, sessionCount };
      return a;
    }, {});
  }

  async getValues(config: Configuration): Promise<Sheets | undefined> {
    if (config.spreadsheetId) {
      const batchHighestRepeat = config.batch?.repeat || 0;
      const { sheets, sessionCount } = this.getSheets(config, batchHighestRepeat);
      this.transformSheets(sheets);
      let result = await GoogleSheetsService.getSheets(
        chrome.runtime.id,
        config.spreadsheetId,
        Array.from(sheets, ([sheetName, range]) => `${sheetName}!${range}`)
      );
      result = this.transformResult(result, sessionCount);
      window.__sheets = result;
      Logger.colorDebug('Google Sheets', result);
      return result;
    }
  }
}
