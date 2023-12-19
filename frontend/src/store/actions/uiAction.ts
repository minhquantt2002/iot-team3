import { PayloadAction } from "@reduxjs/toolkit"

import { UiState } from "../../common/Ui"

// init
export const initUiState: UiState = {
    sidebarShow: true,
    selectItem: ['dashboard'],
    addDialogOpen: false,
    editDialogOpen: false,
    deleteDialogOpen: false,
    uploadDialogOpen: false,
    selectRowTable: null,
}


// func
export const toggleSidebar = (state: UiState) => {
    state.sidebarShow = !state.sidebarShow
}
export const activeItem = (state: UiState, action: PayloadAction<UiState>) => {
    state.selectItem = action.payload.selectItem
}

export const openDeleteDialog = (state: UiState) => {
    state.deleteDialogOpen = true
}

export const closeDeleteDialog = (state: UiState) => {
    state.deleteDialogOpen = false
}

export const openEditDialog = (state: UiState) => {
    state.editDialogOpen = true
}

export const closeEditDialog = (state: UiState) => {
    state.editDialogOpen = false
}

export const openAddDialog = (state: UiState) => {
    state.addDialogOpen = true
}

export const closeAddDialog = (state: UiState) => {
    state.addDialogOpen = false
}

export const openUploadDialog = (state: UiState) => {
    state.uploadDialogOpen = true
}

export const closeUploadDialog = (state: UiState) => {
    state.uploadDialogOpen = false
}

export const handleSelectRowTable = (state: UiState, action: PayloadAction<UiState>) => {
    const isSelected = state.selectRowTable?.id === action.payload.selectRowTable?.id
    state.selectRowTable = (isSelected) ? null : action.payload.selectRowTable
}
