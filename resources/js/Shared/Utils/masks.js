export const unmask = (value) => {
    if (!value) {
        value = this;
    }
    if (typeof value !== 'undefined') return value.replace(/[^a-zA-Z\d]/g, '');

    return '';
};

const _inteiro = (value) => {
    if (!value) {
        value = this;
    }
    if (typeof value === 'string') return value.replace(/\D/g, '');

    return '';
};

const _placa = (value) => {
    if (!value) {
        value = (this);
    }

    if (typeof value === 'string') {
        value = value.unmask(value);
        return value.replace(/^([A-Z]{3})([0-9][0-9A-Z][0-9]{2})/, '$1-$2');
    }

    return '';
};

const _cep = (value) => {
    if (!value) {
        value = (this);
    }

    if (typeof value === 'string') {
        value = value.replace(/\D/g, '');
        return value.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    return '';
};

const _currency = (value) => {
    if (!value) {
        value = this;
    }
    if (typeof value === 'string') {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d)(\d{2})$/, '$1,$2');
        return value.replace(/(?=(\d{3})+(\D))\B/g, '.');
    }

    return '';
};

const _cpf = (value) => {
    if (!value) {
        value = this;
    }
    if (typeof value === 'string') {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        return value.replace(/(\d{3})(\d{2})$/, '$1-$2');
    }

    return '';
};

const _cnpj = (value) => {
    if (!value) {
        value = this;
    }

    if (typeof value === 'string') {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1/$2');
        return value.replace(/(\d{4})(\d{2})$/, '$1-$2');
    }

    return '';
};

const _telefone = (value) => {
    if (!value) {
        value = this;
    }
    if (typeof value === 'string') {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        return value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }

    return '';
};

const _date = (value) => {
    if (!value) {
        value = this;
    }
    if (typeof value === 'string') {
        value = value.replace(/\D/g, '');
        value = value.replace(/([0?][1-9]|[12][0-9]|[3][01])(\d)/, '$1/$2');
        value = value.replace(/([0?][1-9]|[1][012])(\d)/, '$1/$2');
        return value;
        //return value.replace(/(0?[1-9]|1[012])$/, '$1/$2')
    }

    return '';
};

function placa(ev) {
    ev.currentTarget.maxLength = 8;
    let value = ev.currentTarget.value;
    ev.currentTarget.value = _placa(value);
    return ev;
}

function cep(ev) {
    ev.currentTarget.maxLength = 9;
    let value = ev.currentTarget.value;
    ev.currentTarget.value = _cep(value);
    return ev;
}

function int(ev) {
    let value = ev.currentTarget.value;
    ev.currentTarget.value = _inteiro(value);
    return ev;
}

function currency(ev) {
    let value = ev.currentTarget.value;
    ev.currentTarget.value = _currency(value);
    return ev;
}

function cpf(ev) {
    ev.currentTarget.maxLength = 14;
    let value = ev.currentTarget.value;
    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
        ev.currentTarget.value = _cpf(value);
    }
    return ev;
}

function cnpj(ev) {
    ev.currentTarget.maxLength = 18;
    let value = ev.currentTarget.value;
    if (!value.match(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})/)) {
        ev.currentTarget.value = _cnpj(value);
    }
    return ev;
}

function cpf_cnpj(ev) {
    let value = ev.currentTarget.value;

    if (value.length <= 14) {
        ev.currentTarget.value = _cpf(value);
        return ev;
    }

    return cnpj(ev);
}

function telefone(ev) {
    ev.currentTarget.maxLength = 15;
    let value = ev.currentTarget.value;
    if (!value.match(/^(\(\d{2}\))(\d{4,5})-(\d{4})$/) && value !== '') {
        ev.currentTarget.value = _telefone(value);
    }
    return ev;
}

function date(ev) {
    ev.currentTarget.maxLength = 10;
    let value = ev.currentTarget.value;
    if (value !== '') {
        ev.currentTarget.value = _date(value);
    }
    return ev;
}

export const masks = {
    cpf_cnpj,
    cnpj,
    cpf,
    telefone,
    int,
    cep,
    currency,
    unmask,
    placa
};

