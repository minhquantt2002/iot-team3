import { createSlice } from '@reduxjs/toolkit'
import * as uiAction from '../actions/uiAction'

const uiSlice = createSlice({
  name: 'ui',
  initialState: uiAction.initUiState,
  reducers: {
    toggleSidebar: uiAction.toggleSidebar,
    activeItem: uiAction.activeItem,
    openAddDialog: uiAction.openAddDialog,
    closeAddDialog: uiAction.closeAddDialog,
    openEditDialog: uiAction.openEditDialog,
    closeEditDialog: uiAction.closeEditDialog,
    openDeleteDialog: uiAction.openDeleteDialog,
    closeDeleteDialog: uiAction.closeDeleteDialog,
    openUploadDialog: uiAction.openUploadDialog,
    closeUploadDialog: uiAction.closeUploadDialog,
    handleSelectRowTable: uiAction.handleSelectRowTable,
  },
})

export const {
  toggleSidebar,
  activeItem,
  openAddDialog,
  closeAddDialog,
  openEditDialog,
  closeEditDialog,
  openDeleteDialog,
  closeDeleteDialog,
  openUploadDialog,
  closeUploadDialog,
  handleSelectRowTable,
} = uiSlice.actions

export default uiSlice
