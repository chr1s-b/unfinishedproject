// loads/generates pages for the roommanager, returning html

function element(id:string, type:string, options:any={}):HTMLElement {
    // pass options as json
    let i = document.createElement("input");
    i.type = type;
    for (let key in options) {
        i.setAttribute(key, options[key]);
    }
    i.id = id;
    return i;
}

export function Form(id:string, inputs: [input: {id: string, type: string, option?: any}], class_?:string):string {
    // generate a form with inputs
    let f = document.createElement('form');
    inputs.forEach((input: { id: string, type: string, options?: any }) => {
        f.appendChild(element(input.id, input.type, input.options))
    });

    // add a buttton
    let button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Submit";
    f.appendChild(button);

    f.setAttribute('autocomplete', 'off');
    f.setAttribute('target', 'dud');
    f.setAttribute('onsubmit','wsrelay()')
    if (class_) f.className = class_;
    if (id) f.id = id;
    // ? should this return f or f.outerHTML?
    return f.outerHTML;
}