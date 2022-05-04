import * as Yup from 'yup';
import $t from 'i18n';

const Validators = {
    isAddress: function(_address){
        if (!/^(0x)?[0-9a-f]{40}$/i.test(_address)) {
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(_address) || /^(0x)?[0-9A-F]{40}$/.test(_address)) {
            return true;
        } else {
            return Validators.isChecksumAddress(_address);
        }
    },
    isChecksumAddress: function(_address){
        _address = _address.replace('0x', '');
        var addressHash = sha3(_address.toLowerCase());
        for (var i = 0; i < 40; i++) {
            // the nth letter should be uppercase if the nth digit of casemap is 1
            if ((parseInt(addressHash[i], 16) > 7 && _address[i].toUpperCase() !== _address[i]) || (parseInt(addressHash[i], 16) <= 7 && _address[i].toLowerCase() !== _address[i])) {
                return false;
            }
        }
        return true;
    }
}

export default Validators;

export const storeFrontValidation = Yup.object().shape({
  storeName: Yup.string()
    .required($t('validation.storeNameIsRequired'))
    .min(6, $t('validation.storeNameMinCharacters')),
  storeDescription: Yup.string()
    .required($t('validation.storeDescriptionIsRequired'))
    .min(8, $t('validation.storeDescriptionMinCharacters')),
  storeLocation: Yup.string()
    .required($t('validation.storeLocationIsRequired'))
});