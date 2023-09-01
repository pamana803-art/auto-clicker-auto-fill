import { Action } from '@dhruv-techapps/acf-common';

export type WizardAction = Action & { elementType?: string; elementValue?: string; checked?: boolean; xpath?: string };
