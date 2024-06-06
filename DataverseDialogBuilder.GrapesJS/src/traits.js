import * as Const from './const';

export default (editor, opts = {}) => {
    const traits = editor.Traits;
    traits.addType('text-readonly', {
        createLabel({ label, trait, model }) {
            const { tooltip } = trait.model.attributes;
            const ppfx = editor.getConfig().pStylePrefix || ``;
            return `<div class="${ppfx}label" title="${tooltip ?? ``}">${label} ${Const.IconLock}</div>`;
        },
        getInputEl() {
            if (!this.inputEl) {
                const { model } = this;
                const plh = model.get('placeholder') || model.get('default') || ``;
                const value = this.getModelValue();
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `${plh}`;
                input.readOnly = true;
                input.style.backgroundColor = 'gray;';
                input.style.color = 'black;';
                if (value !== undefined) {
                    model.set({ value }, { silent: true });
                    input.value = value;
                }
                this.inputEl = input;
            }
            return this.inputEl;
        }
    });
    traits.addType('text-area', {
        createLabel({ label, trait }) {
            const { tooltip } = trait.model.attributes;
            const ppfx = editor.getConfig().pStylePrefix || ``;
            return `<div class="${ppfx}label" title="${tooltip ?? ``}">${label}</div>`;
        },
        getInputEl() {
            if (!this.inputEl) {
                const { model } = this;
                const { rows } = model.attributes;
                const value = this.getModelValue();
                const input = document.createElement('textarea');
                input.rows = rows ?? 2;
                if (value !== undefined) {
                    model.set({ value }, { silent: true });
                    input.value = value;
                }
                this.inputEl = input;
            }
            return this.inputEl;
        }
    });
}