const Formatters = {
    trunctToLen: function(_string, _length, _prepend = "..."){
        return _string.length > _length ? `${_string.substr(0, _length)}${_prepend}` : _string;
    },
    boolToText: function(_bool){
        return (_bool ? 'Yes' : 'No');
    }
}

export default Formatters;