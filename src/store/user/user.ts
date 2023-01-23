import { createSlice } from "@reduxjs/toolkit";
import { NameSpace, AuthorizationStatus } from "../../const";
import { IUserState } from "../../types/state";
import { authMeAction, loginAction } from "../apiActions";
import { dropToken } from "../../services/token";

const initialState: IUserState = {
	authorizationStatus: AuthorizationStatus.NO_AUTH,
	user: null,
};

export const userSlice = createSlice({
	name: NameSpace.USER,
	initialState,
	reducers: {
		logout: (state) => {
			dropToken();
			state.authorizationStatus = AuthorizationStatus.NO_AUTH;
			state.user = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginAction.fulfilled, (state, action) => {
				state.authorizationStatus = AuthorizationStatus.AUTH;
				state.user = action.payload;
			})
			.addCase(loginAction.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NO_AUTH;
				state.user = null;
			})
			.addCase(authMeAction.fulfilled, (state, action) => {
				state.authorizationStatus = AuthorizationStatus.AUTH;
				state.user = action.payload;
			})
			.addCase(authMeAction.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NO_AUTH;
				state.user = null;
			});
	},
});

export const { logout } = userSlice.actions;
