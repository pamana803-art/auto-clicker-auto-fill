import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { selectedConfigSelector } from "../config.slice";

const selectedActionIndexSelector = (state: RootState) => state.configuration.selectedActionIndex;

export const selectedActionSelector = createSelector(selectedConfigSelector, selectedActionIndexSelector, (config, selectedActionIndex) => config.actions[selectedActionIndex]);

export const selectedActionSettingsSelector = createSelector(selectedActionSelector, action => action.settings)

export const selectedActionStatementSelector = createSelector(selectedActionSelector, action => action.statement)

export const selectedActionAddonSelector = createSelector(selectedActionSelector, action => action.addon)

export const selectedActionStatementConditionsSelector = createSelector(selectedActionSelector, action => action.statement?.conditions)
