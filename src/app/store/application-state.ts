import { UiState } from "app/store/ui-state";
import { StoreData } from "app/store/store-data";

export interface ApplicationState {
    uiState: UiState;
    storeData: StoreData
}