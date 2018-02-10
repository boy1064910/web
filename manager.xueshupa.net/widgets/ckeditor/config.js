/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.allowedContent= true;
	config.extraPlugins = 'formulaSelector,formulaInput';
	config.toolbar = [
		{ name: 'styles', items: [ 'Source','Undo', 'Redo','Format', 'Font', 'FontSize' ] },
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting' ] },
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
		{ name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', 'Outdent', 'Indent' ] },
		{ name: 'insert', items: [ 'Image', 'Table', 'formulaSelector','formulaInput', 'Math' ] }
	];
	// config.extraPlugins = 'formulaSelector';
	
};
