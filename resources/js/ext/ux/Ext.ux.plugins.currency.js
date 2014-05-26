Ext.namespace('Ext.ux.plugins');

Ext.ux.plugins.currency = function(config) {
    Ext.apply(this, config);
};

Ext.extend(Ext.ux.plugins.currency, Ext.util.Observable, {

    init:function(textField) {
        Ext.apply(textField, {
            onRender:textField.onRender.createSequence(function() {
                this.currencyConfig = Ext.apply(
                    {
                    symbolBeforeAmount: false,
                    currencySymbol: '', //  use '\u20AC' for euro sign (= unicode)
                    decimalSeparator: '.',
                    thousandsSeparator: '',
                    negativeAmountClass: ''
                },this.currencyConfig);
                this.maskRe =  new RegExp( '[\\-\\d\\'+this.currencyConfig.decimalSeparator+(this.currencyConfig.thousandsSeparator.trim()!==""? "\\"+this.currencyConfig.thousandsSeparator:"")+']','i' );
                var name = this.name || this.el.dom.name;
                this.validator = function(theVal){
                    if (isNaN(parseFloat(this.formatHiddenValue(theVal))) && theVal != "") {
                        return this.currencyConfig.invalidAmountText || false;
                    }
                    return true;
                };
                this.hiddenField = this.el.insertSibling({
                     tag:'input'
                    ,type:'hidden'
                    ,name:name
                    ,value:this.formatHiddenValue(this.value)
                });
                this.hiddenName = name; // otherwise field is not found by BasicForm::findField
                this.el.dom.removeAttribute('name');
                this.el.on({
                     keyup:{scope:this, fn:this.updateHidden},
                     focus:{scope:this, fn:this.cleanForEdit},
                     blur:{scope:this, fn:this.updateShown}
                }, Ext.isIE ? 'after' : 'before');
            }),
            setValue: function(theValue){
                Ext.form.TextField.superclass.setValue.call(this, theValue);
                this.updateShown();
            },
            updateShown: function(){
                if (this.isValid() && this.getValue().trim() !== ""){
                    var newValue = "";
                    var currentValue = parseFloat(this.formatHiddenValue(this.getValue()));
                    var toShowFormat = '0'+this.currencyConfig.thousandsSeparator+'0.00';
                    if (this.currencyConfig.decimalSeparator === ',' ) {
                        toShowFormat = '0'+this.currencyConfig.thousandsSeparator+'0,00/i';
                    }
                    if (this.currencyConfig.symbolBeforeAmount === true) {
                        newValue = this.currencyConfig.currencySymbol +
                                   (this.currencyConfig.currencySymbol.trim() !== ""?" ":"") +
                                    Ext.util.Format.number(currentValue,toShowFormat);
                    }
                    else {
                        newValue = Ext.util.Format.number(currentValue,toShowFormat) +
                                   (this.currencyConfig.currencySymbol.trim() !== ""?" ":"") +
                                   this.currencyConfig.currencySymbol;
                    }
                    if (currentValue < 0) {
                        this.el.addClass(this.currencyConfig.negativeAmountClass);
                    }
                    else {
                        this.el.removeClass(this.currencyConfig.negativeAmountClass);
                    }
                    this.setRawValue(newValue);
                    this.updateHidden();
                 }
            },
            updateHidden:function() {
                    this.hiddenField.dom.value = (this.isValid()?this.formatHiddenValue(this.getValue()):"");
            },
            formatHiddenValue: function(rawAmount){
                if (!rawAmount) {
                    return;
                }
                rawAmount = String(rawAmount).replace(this.currencyConfig.currencySymbol,'');
                rawAmount = String(rawAmount).replace(this.currencyConfig.thousandsSeparator,'');
                rawAmount = String(rawAmount).replace(this.currencyConfig.decimalSeparator,'.');
                return rawAmount.trim();
            },
            cleanForEdit:function(textField) {
                    this.setRawValue(String(this.getValue()).replace(this.currencyConfig.currencySymbol,'').trim());
                    this.setRawValue(String(this.getValue()).replace(this.currencyConfig.thousandsSeparator,'').trim());

            }
        });
    }
});
Ext.preg('currency', Ext.ux.plugins.currency);
