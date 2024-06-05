import metadata from './metadata/metadata';
import parameter from './metadata/parameter';
import event from './metadata/event';
import javascript from './metadata/javascript';
import header from './container/header';
import tabs from './container/tabs';
import tab from './container/tab'
import tabheader from './container/tabheader';
import footer from './container/footer';
import tabfooter from './container/tabfooter';
import section from './container/section';
import sections from './container/sections';
import hidden from './control/hidden';
import label from './control/label';
import button from './control/button';
import textbox from './control/textbox';
import datetime from './control/datetime';
import number from './control/number';
import lookup from './control/lookup';
import regarding from './control/regarding';
import iframe from './control/iframe';
import spacer from './control/spacer';
import textarea from './control/textarea';
import dropdown from './control/dropdown';
import optionset from './control/optionset';
import twooptions from './control/twooptions';
import subgrid from './control/subgrid';
import chart from './control/chart';
import advfind from './control/advfind';
import rtb from './control/richtextbox';
import entityoptionset from './control/entityoptionset';
import advfindresult from './control/advfindresult';
import upload from './control/upload';
import advfindandresult from './control/advfindandresult';
import unknown from './control/unknown';
import multiselectlookup from './control/multiselectlookup';

export default (editor, opts) => {
    const domc = editor.DomComponents;
    const allComponents = [
        metadata(editor, opts),
        parameter(editor, opts),
        event(editor, opts),
        javascript(editor, opts),
        header(editor, opts),
        tabs(editor, opts),
        tab(editor, opts),
        tabheader(editor, opts),
        footer(editor, opts),
        tabfooter(editor, opts),
        section(editor, opts),
        sections(editor, opts),
        hidden(editor, opts),
        label(editor, opts),
        button(editor, opts),
        textbox(editor, opts),
        datetime(editor, opts),
        number(editor, opts),
        lookup(editor, opts),
        regarding(editor, opts),
        iframe(editor, opts),
        spacer(editor, opts),
        textarea(editor, opts),
        dropdown(editor, opts),
        optionset(editor, opts),
        twooptions(editor, opts),
        subgrid(editor, opts),
        chart(editor, opts),
        advfind(editor, opts),
        rtb(editor, opts),
        entityoptionset(editor, opts),
        advfindresult(editor, opts),
        upload(editor, opts),
        advfindandresult(editor, opts),
        unknown(editor, opts),
        multiselectlookup(editor, opts)
    ];
    allComponents.map((comp) => domc.addType(comp.type, comp.methods));
};
