import React from 'react';
import { Page, ReactSpecimen } from 'catalog';
import 'highlight.js/styles/zenburn.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHeader from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

/* eslint-disable */
class Validation extends React.Component {
  constructor(props) {
    super(props);
  }
  onUpdate(...args) {
  }
  render() {
    return (
      <Page>
        <p>List of validation rules available</p>

        <hr />

        <Paper style={{width:'100%'}}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Rule</TableCell>
                <TableCell>JSON Input</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell style={{'white-space': 'normal'}}>
                  mandatory
                </TableCell>
                <TableCell>
                {`{
                  rule: 'mandatory',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the field is empty
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  email
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'email',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is an email
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  equals
                </TableCell>
                <TableCell style={{ 'white-space': 'normal' }}>
                  {`{
                    rule: 'equals',
                    message: 'error message',
                    value: 'comparsion value'
                  }` }
                </TableCell>
                <TableCell>
                  check if the string matches the comparison
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  mobile
                </TableCell>
                <TableCell style={{ 'white-space': 'normal' }}>
                  {`{
                    rule: 'mobile',
                    message: 'error message',
                    value: 'locale'
                  }`}
                </TableCell>
                <TableCell style={{ 'white-space': 'normal' }}>
                  {`check if the string is a mobile phone number, (locale is one of ['ar-DZ', 'ar-SA', 'ar-SY', 'cs-CZ', 'de-DE', 'da-DK', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-CA', 'en-ZA', 'en-ZM', 'es-ES', 'fi-FI', 'fr-FR', 'hu-HU', 'it-IT', 'ja-JP', 'ms-MY', 'nb-NO', 'nn-NO', 'pl-PL', 'pt-PT', 'ru-RU', 'sr-RS', 'tr-TR', 'vi-VN', 'zh-CN', 'zh-TW'])`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  lowercase
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'lowercase',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is lowercase
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  uppercase
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'uppercase',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is uppercase
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  length
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'length',
                  message: 'error message',
                  value: {min: 4, max: 10}
                }`}
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                  {`check if the string's length falls in a range. options is an object which defaults to {min:0, max: undefined}`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  url
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'url',
                  message: 'error message',
                  value: 'options'
                }`}
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                  {`check if the string is an URL. options is an object which defaults to { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false }`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  creditcard
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'creditcard',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is a credit card
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  currency
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'currency',
                  message: 'error message',
                  value: 'options'
                }`}
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                  {`check if the string is a valid currency amount. options is an object which defaults to {symbol: '$', require_symbol: false, allow_space_after_symbol: false, symbol_after_digits: false, allow_negatives: true, parens_for_negatives: false, negative_sign_before_digits: false, negative_sign_after_digits: false, allow_negative_sign_placeholder: false, thousands_separator: ',', decimal_separator: '.', allow_space_after_digits: false }`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  date
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'date',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is a date
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  boolean
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'boolean',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if a string is a boolean
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  alphanumeric
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'alphanumeric',
                  message: 'error message',
                  value: 'locale'
                }`}
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                  {`check if the string contains only letters and numbers. Locale is one of ['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'cs-CZ', 'da-DK', 'de-DE', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM', 'es-ES', 'fr-FR', 'fr-BE', 'hu-HU', 'nl-BE', 'nl-NL', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'sr-RS', 'sr-RS@latin', 'tr-TR', 'uk-UA']) and defaults to en-US`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  contains
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'contains',
                  message: 'error message',
                  value: 'seed'
                }`}
                </TableCell>
                <TableCell>
                  check if the string contains the seed
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  FQDN
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'FQDN',
                  message: 'error message',
                  value: 'options'
                }`}
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                  {`check if the string is a fully qualified domain name (e.g. domain.com). options is an object which defaults to { require_tld: true, allow_underscores: false, allow_trailing_dot: false }`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  float
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'float',
                  message: 'error message',
                  value: 'options'
                }`}
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                  {`check if the string is a float. options is an object which can contain the keys min, max, gt, and/or lt to validate the float is within boundaries (e.g. { min: 7.22, max: 9.55 }). min and max are equivalent to 'greater or equal' and 'less or equal', respectively while gt and lt are their strict counterparts.`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  ip
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'ip',
                  message: 'error message',
                  value: 'version'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is an IP (version 4 or 6)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  MACAddress
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'MACAddress',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is a MAC address.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  MD5
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'MD5',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is a MD5 hash.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  numeric
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'numeric',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string contains only numbers
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  negative
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'negative',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is a negative number
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  UUID
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'UUID',
                  message: 'error message',
                  value: 'version'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is a UUID (version 3, 4 or 5)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  matches
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'matches',
                  message: 'error message',
                  value: 'pattern'
                }`}
                </TableCell>
                <TableCell>
                  {`check if string matches the pattern (eg. /foo/i)`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  int
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'int',
                  message: 'error message',
                  value: 'options'
                }`}
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                  {`check if the string is an integer. options is an object which can contain the keys min and/or max to check the integer is within boundaries (e.g. { min: 10, max: 99 }). options can also contain the key allow_leading_zeroes, which when set to false will disallow integer values with leading zeroes (e.g. { allow_leading_zeroes: false }). Finally, options can contain the keys gt and/or lt which will enforce integers being greater than or less than, respectively, the value provided (e.g. {gt: 1, lt: 4} for a number between 1 and 4)`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  hexcolor
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'hexcolor',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is a hexadecimal color
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  dataURI
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'dataURI',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell>
                  check if the string is a data uri format.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  decimal
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'decimal',
                  message: 'error message'
                }`}
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                  {`check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  alpha
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                {`{
                  rule: 'alpha',
                  message: 'error message',
                  value: 'locale'
                }`}
                </TableCell>
                <TableCell style={{'white-space': 'normal'}}>
                  {`check if the string contains only letters (a-zA-Z). Locale is one of ['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'cs-CZ', 'da-DK', 'de-DE', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM', 'es-ES', 'fr-FR', 'hu-HU', 'nl-NL', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'sr-RS', 'sr-RS@latin', 'tr-TR', 'uk-UA']) and defaults to en-US.`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Page>
    );
  }
}

export default Validation;
