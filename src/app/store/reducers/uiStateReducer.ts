import { INITIAL_UI_STATE, UiState } from "app/store/ui-state";
import { Action } from "@ngrx/store";
import { THREAD_SELECTED_ACTION, SELECT_USER_ACTION, SelectUserAction, ThreadSelectedAction } from "app/store/actions";

export function uiState(state: UiState, action: Action) : UiState {
 
    switch(action.type) {
      case THREAD_SELECTED_ACTION:
        const newState = Object.assign({}, state);
        const act = <ThreadSelectedAction> action;
        newState.currentThreadId = act.payload.selectedThreadId;
        return newState;
      case SELECT_USER_ACTION:
        return handleSelectUserAction(state, <SelectUserAction> action);
      default: 
        return state;
    }
  }

  function handleSelectUserAction(state: UiState, action: SelectUserAction) {
    const newUIState = Object.assign({}, state);
    newUIState.userId = action.payload;
    newUIState.currentThreadId = undefined;
    
    return newUIState; 
  }