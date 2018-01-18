import { UiState, INITIAL_UI_STATE } from "app/store/ui-state";
import { StoreData, INITIAL_STORE_DATA } from "app/store/store-data";
import {RouterStateUrl} from "./utils";
import * as fromRouter from '@ngrx/router-store';

export interface ApplicationState {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    uiState: UiState;
    storeData: StoreData
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    uiState: INITIAL_UI_STATE,
    storeData: INITIAL_STORE_DATA,
    router: undefined
}