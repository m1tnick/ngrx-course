import { UiState, INITIAL_UI_STATE } from "app/store/ui-state";
import { StoreData, INITIAL_STORE_DATA } from "app/store/store-data";

export interface ApplicationState {
    uiState: UiState;
    storeData: StoreData
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    uiState: INITIAL_UI_STATE,
    storeData: INITIAL_STORE_DATA
}