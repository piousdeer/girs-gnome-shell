// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js

import Clutter from '@girs/clutter-13';
import Gio from '@girs/gio-2.0';
import GObject from '@girs/gobject-2.0';
import St from '@girs/st-13';

import * as PopupMenu from './popupMenu.js';
import { Slider } from './slider.js';

/**
 * Class representing a quick settings item.
 */
export declare class QuickSettingsItem extends St.Button {
    hasMenu: boolean;
    menu: QuickToggleMenu;

    /**
     * Initializes a new instance of `QuickSettingsItem`.
     */    
    _init(config?: St.Button.ConstructorProperties): void
}

/**
 * Class representing a quick toggle item.
 */
export declare class QuickToggle extends QuickSettingsItem {
    title: string;
    subtitle: string;
    iconName: string;
    gicon: Gio.Icon;

    private _box: St.BoxLayout;
    private _icon: St.Icon;
    private _title: St.Label;
    private _subtitle: St.Label;

    /**
     * Initializes a new instance of `QuickToggle`.
     */
    _init(params: St.Button.ConstructorProperties): void;

    get label(): string;
    set label(label: string);
}

/**
 * Class representing a quick menu toggle.
 */
export declare class QuickMenuToggle extends QuickSettingsItem {
    title: string;
    subtitle: string;
    iconName: string;
    gicon: Gio.Icon;
    menuEnabled: boolean;

    private _box: St.BoxLayout;
    private _menuButton: St.Button;

    /**
     * Initializes a new instance of `QuickMenuToggle`.
     */
    _init(params: St.Button.ConstructorProperties): void;
}

/**
 * Class representing a quick slider.
 */
export declare class QuickSlider extends QuickSettingsItem {
    iconName: string;
    gicon: Gio.Icon;
    iconReactive: boolean;
    iconLabel: string;
    menuEnabled: boolean;
    slider: Slider;

    private _icon: St.Icon;
    private _iconButton: St.Button;

    /**
     * Initializes a new instance of `QuickSlider`.
     */
    _init(params: St.Button.ConstructorProperties): void;
}

/**
 * Class representing a quick toggle menu.
 */
export declare class QuickToggleMenu extends PopupMenu.PopupMenuBase {
    header: St.Widget;
    private _headerIcon: St.Icon;
    private _headerTitle: St.Label;
    private _headerSubtitle: St.Label;
    private _headerSpacer: Clutter.Actor;

    /**
     * Initializes a new instance of `QuickToggleMenu`.
     */
    constructor(sourceActor: St.Widget);

    /**
     * Sets the header of the menu.
     */
    setHeader(icon: string | Gio.Icon, title: string, subtitle?: string): void;

    /**
     * Adds a suffix to the header.
     */
    addHeaderSuffix(actor: Clutter.Actor): void;

    open(animate: boolean): void;
    close(animate: boolean): void;

    private _syncChecked(): void;
}

/**
 * Class representing a system indicator.
 */
export declare class SystemIndicator extends St.BoxLayout {
    quickSettingsItems: QuickSettingsItem[];

    /**
     * Initializes a new instance of `SystemIndicator`.
     */
    _init(): void;

    /**
     * Adds an indicator to the system indicator.
     */
    _addIndicator(): St.Icon;
}

/**
 * Layout metadata for QuickSettingsLayout.
 */
export declare class QuickSettingsLayoutMeta extends Clutter.LayoutMeta {
    /**
     * The span of a child widget in grid columns.
     */
    columnSpan: number;
}

/**
 * Custom layout manager for QuickSettingsMenu.
 */
export declare class QuickSettingsLayout extends Clutter.LayoutManager {
    /**
     * Spacing between rows.
     */
    rowSpacing: number;

    /**
     * Spacing between columns.
     */
    columnSpacing: number;

    /**
     * Number of columns in the layout.
     */
    nColumns: number;

    /**
     * Initializes a new instance of QuickSettingsLayout.
     */
    constructor(overlay: Clutter.Actor, params?: Clutter.LayoutManager.ConstructorProperties);

    _init(overlay: Clutter.Actor, params?: Clutter.LayoutManager.ConstructorProperties): void

    /**
     * Method to get child metadata type.
     */
    vfunc_get_child_meta_type(): typeof Clutter.LayoutMeta.$gtype;

    /**
     * Method for setting the container.
     */
    vfunc_set_container(container: Clutter.Container): void;

    /**
     * Method to get preferred width.
     */
    vfunc_get_preferred_width(container: Clutter.Container, forHeight: number): [number, number];

    /**
     * Method to get preferred height.
     */
    vfunc_get_preferred_height(container: Clutter.Container, forWidth: number): [number, number];

    /**
     * Method to allocate space.
     */
    vfunc_allocate(container: Clutter.Container, box: Clutter.ActorBox): void;

    private _getColSpan(container: Clutter.Container, child: Clutter.Actor): number;
    private _getMaxChildWidth(container: Clutter.Container): [number, number];
    private _getRows(container: Clutter.Container): Clutter.Actor[][];
    private _getRowHeight(children: Clutter.Actor[]): [number, number];
}

/**
 * Class representing the QuickSettingsMenu.
 */
export declare class QuickSettingsMenu extends PopupMenu.PopupMenu {
    private _dimEffect: Clutter.BrightnessContrastEffect;
    private _boxPointer: St.Widget;
    private _grid: St.Widget;
    private _overlay: Clutter.Actor;

    /**
     * Initializes a new instance of QuickSettingsMenu.
     */
    constructor(sourceActor: Clutter.Actor, nColumns?: number);

    /**
     * Adds an item to the QuickSettingsMenu.
     */
    addItem(item: Clutter.Actor, colSpan?: number): void;

    /**
     * Inserts an item before a sibling in the QuickSettingsMenu.
     */
    insertItemBefore(item: Clutter.Actor, sibling: Clutter.Actor, colSpan?: number): void;

    /**
     * Gets the first item in the QuickSettingsMenu.
     */
    getFirstItem(): Clutter.Actor;

    open(animate: boolean): void;
    close(animate: boolean): void;

    private _completeAddItem(item: Clutter.Actor, colSpan: number): void;
    private _setDimmed(dim: boolean): void;
}
