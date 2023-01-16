export default () => {
    String.prototype.cnpj = function (string) {
        string = !string ? this : string
        if (typeof string !== 'string') return ''
        return string.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    }

    String.prototype.cpf = function (string) {
        string = !string ? this : string
        if (typeof string !== 'string') return ''
        return string.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    String.prototype.cep = function (string) {
        string = !string ? this : string
        if (typeof string !== 'string') return ''
        string = string.replace(/\D/g, '')
        return string.replace(/^(\d{5})(\d{3})/, '$1-$2')
    }

    String.prototype.telefone = function (string) {
        string = !string ? this : string
        if (typeof string !== 'string') return ''
        string = string.replace(/\D/g, '')
        string = string.substr(0, 1) === '0' ? string.substr(1, string.length) : string
        return string.replace(/^(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
    }

    String.prototype.date = function (string) {
        string = !string ? this : string
        if (typeof string !== 'string') return ''
        string = string.split('-')
        return `${string[1]}/${string[2]}/${string[0]}`
    }

    String.prototype.dateToBR = function (string) {
        string = !string ? this : string
        if (typeof string !== 'string') return ''
        string = string.substring(0, 10).split('-')
        return `${string[2]}/${string[1]}/${string[0]}`
    }

    String.prototype.datetimeToBR = function (string) {
        string = !string ? this : string
        if (typeof string !== 'string') return ''
        const date = new Date(string)
        return date.toLocaleString()
    }

    Window.prototype.datetimeToUS = function (string) {
        if (!(string instanceof Date)) return ''
        const d = new Date(string.getTime());
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
    }

    String.prototype.currency = function (string) {
        string = !string ? this : string
        if (typeof string !== 'string' || isNaN(Number.parseFloat(string))) return '0,00'
        return Number.parseFloat(string).toLocaleString('pt-br', {minimumFractionDigits: 2})
    }

    String.prototype.cpf_cnpj = function (string) {
        string = !string ? this : string
        if (typeof string !== 'string') return ''
        if (string.length <= 11) return String.prototype.cpf(string)
        else return String.prototype.cnpj(string)
    }

    String.prototype.unmask = function (value) {
        if (!value) {
            value = this
        }
        if (typeof value !== 'undefined') return value.replace(/[^a-zA-Z0-9]/g, '')

        return ''
    }

    String.prototype.placa = function (string) {
        string = !string ? this : string
        if (typeof string !== 'string') return ''
        string = string.unmask(string)
        return string.replace(/^([A-Z]{3})([0-9][0-9A-Z][0-9]{2})/, '$1-$2')
    }


    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.substr(1)
    }

    String.prototype.ucwords = function () {
        return this.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())
    }

    String.prototype.toDecimalUS = function (value) {
        if (!value) value = this
        if (typeof value === 'string') {
            value = value.replaceAll('.', '')
            value = value.replace(',', '.')
        }

        return value
    }

    Number.prototype.toDecimalBR = function (value, len = 2) {
        if (!value) value = this
        if (typeof value !== 'number') return 0

        return value.toLocaleString('pt-BR', {minimumFractionDigits: len, maximumFractionDigits: len})
    }
}