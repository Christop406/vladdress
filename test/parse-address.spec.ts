import { expect } from 'chai';
import * as addresser from '../src';

describe('Address Parser (parseAddress)', function () {
    describe('Formatting', () => {
        it('should parse a simple address', function () {
            const result = addresser.parseAddress("123 Main St, Conway, SC");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Conway");
            expect(result.stateAbbreviation).to.equal("SC");
            expect(result.stateName).to.equal("South Carolina");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse a street name with two words', function () {
            const result = addresser.parseAddress("123 Fat Duck St, Powder Springs, GA");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Fat Duck");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Fat Duck St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Powder Springs");
            expect(result.stateAbbreviation).to.equal("GA");
            expect(result.stateName).to.equal("Georgia");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse a street address with double spaces', function () {
            const result = addresser.parseAddress("123 Main  St, Conway, SC");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Conway");
            expect(result.stateAbbreviation).to.equal("SC");
            expect(result.stateName).to.equal("South Carolina");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse a street address with zip code in standard format', function () {
            const result = addresser.parseAddress("123 Main  St, New Braunfels, TX 78132");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("New Braunfels");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.equal("78132");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse a street address with zip code plus four in standard format', function () {
            const result = addresser.parseAddress("123 Main  St, Conway, NC 29526-3131");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Conway");
            expect(result.stateAbbreviation).to.equal("NC");
            expect(result.stateName).to.equal("North Carolina");
            expect(result.zipCode).to.equal("29526");
            expect(result.zipCodePlusFour).to.equal("29526-3131");
        });
        it('should parse a street address with a state name', function () {
            const result = addresser.parseAddress("123 Main  St, Conway, South Carolina 29526-3131");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Conway");
            expect(result.stateAbbreviation).to.equal("SC");
            expect(result.stateName).to.equal("South Carolina");
            expect(result.zipCode).to.equal("29526");
            expect(result.zipCodePlusFour).to.equal("29526-3131");
        });
        it('should parse a street address with a lowercase state name', function () {
            const result = addresser.parseAddress("123 Main  St, Conway, south carolina 29526-3131");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Conway");
            expect(result.stateAbbreviation).to.equal("SC");
            expect(result.stateName).to.equal("South Carolina");
            expect(result.zipCode).to.equal("29526");
            expect(result.zipCodePlusFour).to.equal("29526-3131");
        });
        it('should parse a street address with a lowercase state abbeviation', function () {
            const result = addresser.parseAddress("123 Main  St, San Antonio, tx 29526-3131");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("San Antonio");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.equal("29526");
            expect(result.zipCodePlusFour).to.equal("29526-3131");
        });
        it('should parse a street address with a delimited zip code', function () {
            const result = addresser.parseAddress("123 Main  St, Canyon Lake, tx, 29526-3131");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Canyon Lake");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.equal("29526");
            expect(result.zipCodePlusFour).to.equal("29526-3131");
        });
        it('should parse an address with no city delimiter', function () {
            const result = addresser.parseAddress("1301 Columbia College Drive Columbia, SC 29203");
            expect(result.streetNumber).to.equal("1301");
            expect(result.streetName).to.equal("Columbia College");
            expect(result.streetSuffix).to.equal("Dr");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("1301 Columbia College Dr");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Columbia");
            expect(result.stateAbbreviation).to.equal("SC");
            expect(result.stateName).to.equal("South Carolina");
            expect(result.zipCode).to.equal("29203");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse an address with line 2 incorrectly placed before line 1', function () {
            const result = addresser.parseAddress("UNIT 101, 1301 Acme Street E, Columbia, SC 29203");
            expect(result.streetNumber).to.equal("1301");
            expect(result.streetName).to.equal("Acme");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.equal("E");
            expect(result.addressLine1).to.equal("1301 Acme St E");
            expect(result.addressLine2).to.equal("UNIT 101");
            expect(result.placeName).to.equal("Columbia");
            expect(result.stateAbbreviation).to.equal("SC");
            expect(result.stateName).to.equal("South Carolina");
            expect(result.zipCode).to.equal("29203");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse an address with secondary address at the beginning of line 1', function () {
            const result = addresser.parseAddress("UNIT 101, 1301 Acme Avenue, Columbia, SC 29203");
            expect(result.streetNumber).to.equal("1301");
            expect(result.streetName).to.equal("Acme");
            expect(result.streetSuffix).to.equal("Ave");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("1301 Acme Ave");
            expect(result.addressLine2).to.equal("UNIT 101");
            expect(result.placeName).to.equal("Columbia");
            expect(result.stateAbbreviation).to.equal("SC");
            expect(result.stateName).to.equal("South Carolina");
            expect(result.zipCode).to.equal("29203");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse an address with a trailing directional, all caps, and no delimiters', function () {
            const result = addresser.parseAddress("300 BOYLSTON ST E SEATTLE WA 98102");
            expect(result.streetNumber).to.equal("300");
            expect(result.streetName).to.equal("Boylston");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.equal("E");
            expect(result.addressLine1).to.equal("300 Boylston St E");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Seattle");
            expect(result.stateAbbreviation).to.equal("WA");
            expect(result.stateName).to.equal("Washington");
            expect(result.zipCode).to.equal("98102");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse an address with a trailing country', function () {
            const result = addresser.parseAddress("300 BOYLSTON AVE, SEATTLE WA 98102, USA");
            expect(result.streetNumber).to.equal("300");
            expect(result.streetName).to.equal("Boylston");
            expect(result.streetSuffix).to.equal("Ave");
            expect(result.addressLine1).to.equal("300 Boylston Ave");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Seattle");
            expect(result.stateAbbreviation).to.equal("WA");
            expect(result.stateName).to.equal("Washington");
            expect(result.zipCode).to.equal("98102");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse an address with a dot after street abbreviation', function () {
            const result = addresser.parseAddress("200 SUMMIT LAKE DR., VALHALLA NY 10595");
            expect(result.streetNumber).to.equal("200");
            expect(result.streetName).to.equal("Summit Lake");
            expect(result.streetSuffix).to.equal("Dr");
            expect(result.addressLine1).to.equal("200 Summit Lake Dr");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Valhalla");
            expect(result.stateAbbreviation).to.equal("NY");
            expect(result.stateName).to.equal("New York");
            expect(result.zipCode).to.equal("10595");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse an address with a newline separator', function () {
            const result = addresser.parseAddress("200 SUMMIT LAKE DR.\nVALHALLA NY 10595");
            expect(result.streetNumber).to.equal("200");
            expect(result.streetName).to.equal("Summit Lake");
            expect(result.streetSuffix).to.equal("Dr");
            expect(result.addressLine1).to.equal("200 Summit Lake Dr");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Valhalla");
            expect(result.stateAbbreviation).to.equal("NY");
            expect(result.stateName).to.equal("New York");
            expect(result.zipCode).to.equal("10595");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    });
    describe('Missing Data', () => {
        it('should not parse a street address with missing city and state', function () {
            expect(addresser.parseAddress.bind(addresser.parseAddress, "123 Main  St")).to.throw('Can not parse address.');
        });
        it('should validate input is not undefined', function () {
            expect(addresser.parseAddress.bind(addresser.parseAddress)).to.throw('Argument must be a non-empty string.');
        });
        it('should validate input is a non-empty string', function () {
            expect(addresser.parseAddress.bind(addresser.parseAddress, "")).to.throw('Argument must be a non-empty string.');
        });
        it('should not parse an invalid state abbreviation', function () {
            expect(addresser.parseAddress.bind(addresser.parseAddress, "123 Main St, Canyon Lake, XX, 29526-3131")).to.throw('Can not parse address.');
        });
        it('should throw if mandatory components are not present', function () {
            let error: any;
            try {
                addresser.parseAddress("1010 PINE, 9E-6-01\nST. LOUIS");
            } catch (e) {
                error = e;
            }
    
            expect(error, 'Error thrown from parseAddress').to.exist;
        });
    });
    describe('PO Box', () => {
        it('should parse an address with a PO BOX', function () {
            const result = addresser.parseAddress("PO BOX 538\nBASILE LA 70515-0538");
            expect(result.addressLine1).to.equal("PO BOX 538");
            expect(result.addressLine2).to.be.undefined;
            expect(result.streetNumber).to.be.undefined;
            expect(result.streetName).to.be.undefined;
            expect(result.streetSuffix).to.be.undefined;
            expect(result.placeName).to.equal("Basile");
            expect(result.stateAbbreviation).to.equal("LA");
            expect(result.stateName).to.equal("Louisiana");
            expect(result.zipCode).to.equal("70515");
            expect(result.zipCodePlusFour).to.equal("70515-0538");
        });

        it('should parse an address with a PO BOX written as P.O. DRAWER', function () {
            const result = addresser.parseAddress("P.O. DRAWER 538\nBASILE LA 70515-0538");
            expect(result.addressLine1).to.equal("P.O. DRAWER 538");
            expect(result.addressLine2).to.be.undefined;
            expect(result.streetNumber).to.be.undefined;
            expect(result.streetName).to.be.undefined;
            expect(result.streetSuffix).to.be.undefined;
            expect(result.placeName).to.equal("Basile");
            expect(result.stateAbbreviation).to.equal("LA");
            expect(result.stateName).to.equal("Louisiana");
            expect(result.zipCode).to.equal("70515");
            expect(result.zipCodePlusFour).to.equal("70515-0538");
        });

        it('should provide an id', function () {
            const result = addresser.parseAddress("PO BOX 538\nBASILE LA 70515-0538");
            expect(result.addressLine1).to.equal("PO BOX 538");
            expect(result.id).to.equal('po-box-538-basile-la-70515');
        });
    });
    describe('Edge Cases', () => {
        describe('Repeated Data', () => {
            it('should parse an address with same street and city name', function () {
                const result = addresser.parseAddress("400 South Orange Ave, South Orange , NJ 07079");
                expect(result.streetNumber).to.equal("400");
                expect(result.streetName).to.equal("South Orange");
                expect(result.streetSuffix).to.equal("Ave");
                expect(result.streetDirection).to.be.undefined;
                expect(result.addressLine1).to.equal("400 South Orange Ave");
                expect(result.addressLine2).to.be.undefined;
                expect(result.placeName).to.equal("South Orange");
                expect(result.stateAbbreviation).to.equal("NJ");
                expect(result.stateName).to.equal("New Jersey");
                expect(result.zipCode).to.equal("07079");
                expect(result.zipCodePlusFour).to.be.undefined;
            });
            it('should parse an address with a secondary value on same section with city', function () {
                const result = addresser.parseAddress("1301 Columbia College Drive Unit 101 Columbia, SC 29203");
                expect(result.streetNumber).to.equal("1301");
                expect(result.streetName).to.equal("Columbia College");
                expect(result.streetSuffix).to.equal("Dr");
                expect(result.addressLine1).to.equal("1301 Columbia College Dr");
                expect(result.addressLine2).to.equal("Unit 101");
                expect(result.streetDirection).to.be.undefined;
                expect(result.placeName).to.equal("Columbia");
                expect(result.stateAbbreviation).to.equal("SC");
                expect(result.stateName).to.equal("South Carolina");
                expect(result.zipCode).to.equal("29203");
                expect(result.zipCodePlusFour).to.be.undefined;
            });
            it('should parse an address with a secondary value on separate line', function () {
                const result = addresser.parseAddress("1301 Columbia College Drive, APT A, Columbia, SC 29203");
                expect(result.streetNumber).to.equal("1301");
                expect(result.streetName).to.equal("Columbia College");
                expect(result.streetSuffix).to.equal("Dr");
                expect(result.streetDirection).to.be.undefined;
                expect(result.addressLine1).to.equal("1301 Columbia College Dr");
                expect(result.addressLine2).to.equal("APT A");
                expect(result.placeName).to.equal("Columbia");
                expect(result.stateAbbreviation).to.equal("SC");
                expect(result.stateName).to.equal("South Carolina");
                expect(result.zipCode).to.equal("29203");
                expect(result.zipCodePlusFour).to.be.undefined;
            });
            it('should parse an address with a glen plus haven suffix (2 suffixes)', function () {
                const result = addresser.parseAddress("1301 Glen Haven, Columbia, SC 29203");
                expect(result.streetNumber).to.equal("1301");
                expect(result.streetName).to.equal("Glen");
                expect(result.streetSuffix).to.equal("Hvn");
                expect(result.streetDirection).to.be.undefined;
                expect(result.addressLine1).to.equal("1301 Glen Hvn");
                expect(result.addressLine2).to.be.undefined;
                expect(result.placeName).to.equal("Columbia");
                expect(result.stateAbbreviation).to.equal("SC");
                expect(result.stateName).to.equal("South Carolina");
                expect(result.zipCode).to.equal("29203");
                expect(result.zipCodePlusFour).to.be.undefined;
            });
        });
        it('should parse a street address with "Ave C" style street name', function () {
            const result = addresser.parseAddress("826 N Ave C, Crowley, LA 70526");
            expect(result.streetNumber).to.equal("826");
            expect(result.streetName).to.equal("N Ave C");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("826 N Ave C");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Crowley");
            expect(result.stateAbbreviation).to.equal("LA");
            expect(result.stateName).to.equal("Louisiana");
            expect(result.zipCode).to.equal("70526");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse a street address with "Avenue N" style street name', function () {
            const result = addresser.parseAddress("826 N Avenue N, Crowley, LA 70526");
            expect(result.streetNumber).to.equal("826");
            expect(result.streetName).to.equal("N Ave N");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("826 N Ave N");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Crowley");
            expect(result.stateAbbreviation).to.equal("LA");
            expect(result.stateName).to.equal("Louisiana");
            expect(result.zipCode).to.equal("70526");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse a street address with "Ave. b" style street name', function () {
            const result = addresser.parseAddress("826 N Ave. b, Crowley, LA 70526");
            expect(result.streetNumber).to.equal("826");
            expect(result.streetName).to.equal("N Ave B");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("826 N Ave B");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Crowley");
            expect(result.stateAbbreviation).to.equal("LA");
            expect(result.stateName).to.equal("Louisiana");
            expect(result.zipCode).to.equal("70526");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse a street address with "Ave. b" style street name with non delimited second address line', function () {
            const result = addresser.parseAddress("826 N Ave. b Unit 101, Crowley, LA 70526");
            expect(result.streetNumber).to.equal("826");
            expect(result.streetName).to.equal("N Ave B");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("826 N Ave B");
            expect(result.addressLine2).to.equal("Unit 101");
            expect(result.placeName).to.equal("Crowley");
            expect(result.stateAbbreviation).to.equal("LA");
            expect(result.stateName).to.equal("Louisiana");
            expect(result.zipCode).to.equal("70526");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse a street address without a normal suffix like 123 Texas Gold', function () {
            const result = addresser.parseAddress("12939 Texas Gold, San Antonio, TX 78253");
            expect(result.streetNumber).to.equal("12939");
            expect(result.streetName).to.equal("Texas Gold");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal('12939 Texas Gold');
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("San Antonio");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.equal('78253');
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse a street address without a normal suffix and 2nd address line like 123 Texas Gold Unit 101', function () {
            const result = addresser.parseAddress("12939 Texas Gold Unit 101, San Antonio, TX 78253");
            expect(result.streetNumber).to.equal("12939");
            expect(result.streetName).to.equal("Texas Gold");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("12939 Texas Gold");
            expect(result.addressLine2).to.equal("Unit 101");
            expect(result.placeName).to.equal("San Antonio");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.equal('78253');
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse an Interstate address with a # unit', function () {
            const result = addresser.parseAddress("10701 S Interstate 35 # 35, Austin, TX");
            expect(result.streetNumber).to.equal("10701");
            expect(result.streetName).to.equal("S Interstate 35");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("10701 S Interstate 35");
            expect(result.addressLine2).to.equal("# 35");
            expect(result.placeName).to.equal("Austin");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse FM number style road names', function () {
            const result = addresser.parseAddress("11434 W FM 471, San Antonio, TX");
            expect(result.streetNumber).to.equal("11434");
            expect(result.streetName).to.equal("W FM 471");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("11434 W FM 471");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("San Antonio");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse street name ending in Oak', function () {
            const result = addresser.parseAddress("24330 Invitation Oak, San Antonio, TX");
            expect(result.streetNumber).to.equal("24330");
            expect(result.streetName).to.equal("Invitation Oak");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("24330 Invitation Oak");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("San Antonio");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse street name thats just a number', function () {
            const result = addresser.parseAddress("506 W 1100, Chesterton, IN");
            expect(result.streetNumber).to.equal("506");
            expect(result.streetName).to.equal("W 1100");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("506 W 1100");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Chesterton");
            expect(result.stateAbbreviation).to.equal("IN");
            expect(result.stateName).to.equal("Indiana");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse street name that ends in Run', function () {
            const result = addresser.parseAddress("25403 Longbranch Run, San Antonio, TX");
            expect(result.streetNumber).to.equal("25403");
            expect(result.streetName).to.equal("Longbranch Run");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("25403 Longbranch Run");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("San Antonio");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse street name that ends in Chase', function () {
            const result = addresser.parseAddress("22923 Cardigan Chase, San Antonio, TX");
            expect(result.streetNumber).to.equal("22923");
            expect(result.streetName).to.equal("Cardigan Chase");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("22923 Cardigan Chase");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("San Antonio");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse street name that ends in Day', function () {
            const result = addresser.parseAddress("7114 Sunny Day, San Antonio, TX");
            expect(result.streetNumber).to.equal("7114");
            expect(result.streetName).to.equal("Sunny Day");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("7114 Sunny Day");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("San Antonio");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse street name that has a leading directional and is just a number', function () {
            const result = addresser.parseAddress("110 N 2500, Vernal, UT");
            expect(result.streetNumber).to.equal("110");
            expect(result.streetName).to.equal("N 2500");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("110 N 2500");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Vernal");
            expect(result.stateAbbreviation).to.equal("UT");
            expect(result.stateName).to.equal("Utah");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse "123 Rue Dauphine style address', function () {
            const result = addresser.parseAddress("625 Rue Dauphine, Eunice, LA");
            expect(result.streetNumber).to.equal("625");
            expect(result.streetName).to.equal("Rue Dauphine");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("625 Rue Dauphine");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Eunice");
            expect(result.stateAbbreviation).to.equal("LA");
            expect(result.stateName).to.equal("Louisiana");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should parse street name of N Portola with unit name', function () {
            const result = addresser.parseAddress("47 N Portola, # 35, Laguna Beach, CA");
            expect(result.streetNumber).to.equal("47");
            expect(result.streetName).to.equal("N Portola");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("47 N Portola");
            expect(result.addressLine2).to.equal("# 35");
            expect(result.placeName).to.equal("Laguna Beach");
            expect(result.stateAbbreviation).to.equal("CA");
            expect(result.stateName).to.equal("California");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse a street name with no suffix but the street name itself matches a suffix', function () {
            const result = addresser.parseAddress("1010 PINE, 9E-6-01\nST. LOUIS MO 63101");
            expect(result.streetNumber).to.equal("1010");
            expect(result.streetName).to.equal("Pine");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("1010 Pine");
            expect(result.addressLine2).to.equal("9E-6-01");
            expect(result.placeName).to.equal("St. Louis");
            expect(result.stateAbbreviation).to.equal("MO");
            expect(result.stateName).to.equal("Missouri");
            expect(result.zipCode).to.equal("63101");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    });
    describe('Street Directions', () => {
        it('should parse an address with a direction following the street type', function () {
            const result = addresser.parseAddress("1301 Acme Street E, Columbia, SC 29203");
            expect(result.streetNumber).to.equal("1301");
            expect(result.streetName).to.equal("Acme");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.equal("E");
            expect(result.addressLine1).to.equal("1301 Acme St E");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Columbia");
            expect(result.stateAbbreviation).to.equal("SC");
            expect(result.stateName).to.equal("South Carolina");
            expect(result.zipCode).to.equal("29203");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse an address with a lowercase direction following the street type', function () {
            const result = addresser.parseAddress("1301 Acme Street e, Columbia, SC 29203");
            expect(result.streetNumber).to.equal("1301");
            expect(result.streetName).to.equal("Acme");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.equal("E");
            expect(result.addressLine1).to.equal("1301 Acme St E");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Columbia");
            expect(result.stateAbbreviation).to.equal("SC");
            expect(result.stateName).to.equal("South Carolina");
            expect(result.zipCode).to.equal("29203");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    });
    describe('Data Issues', () => {
        it('should parse a valid address for a small city not in us-cities.json file', function () {
            const result = addresser.parseAddress("5555 Duffek Dr, Kirby, TX 78219");
            expect(result.streetNumber).to.equal("5555");
            expect(result.streetName).to.equal("Duffek");
            expect(result.streetSuffix).to.equal("Dr");
            expect(result.addressLine1).to.equal("5555 Duffek Dr");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Kirby");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.equal("78219");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    });

    describe('Normal Cases', () => {
        it('should provide an id for a valid address with second address line', function () {
            const result = addresser.parseAddress("123 Main St Unit 101, Conway, SC 29526");
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.equal("Unit 101");
            expect(result.id).to.equal('123-main-st-unit-101-conway-sc-29526');
        });
    
        it('should parse a street address ending in pass', function () {
            const result = addresser.parseAddress("15001 Strathaven Pass, Pflugerville, TX 78660");
            expect(result.streetNumber).to.equal("15001");
            expect(result.streetName).to.equal("Strathaven");
            expect(result.streetSuffix).to.equal("Pass");
            expect(result.addressLine1).to.equal("15001 Strathaven Pass");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Pflugerville");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.equal("78660");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    });

    describe('Formatted Address', () => {
        it('should return a formattedAddress field', function () {
            const result = addresser.parseAddress("12939 Texas Gold, San Antonio, TX 78253");
            expect(result.streetNumber).to.equal("12939");
            expect(result.streetName).to.equal("Texas Gold");
            expect(result.streetSuffix).to.be.undefined
            expect(result.addressLine1).to.equal("12939 Texas Gold");
            expect(result.addressLine2).to.be.undefined
            expect(result.formattedAddress).to.equal("12939 Texas Gold, San Antonio, TX 78253");
            expect(result.placeName).to.equal("San Antonio");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.equal('78253');
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    
        it('should return a formattedAddress field when a second address line is provided', function () {
            const result = addresser.parseAddress("12939 Live Oak Street Unit 101, San Antonio, TX 78253");
            expect(result.streetNumber).to.equal("12939");
            expect(result.streetName).to.equal("Live Oak");
            expect(result.streetSuffix).to.equal("St");
            expect(result.addressLine1).to.equal("12939 Live Oak St");
            expect(result.addressLine2).to.equal("Unit 101");
            expect(result.formattedAddress).to.equal("12939 Live Oak St, Unit 101, San Antonio, TX 78253");
            expect(result.placeName).to.equal("San Antonio");
            expect(result.stateAbbreviation).to.equal("TX");
            expect(result.stateName).to.equal("Texas");
            expect(result.zipCode).to.equal('78253');
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    });

    describe('Canadian Addresses', () => {
        it('should parse a simple Canadian Address without zip Code', function () {
            const result = addresser.parseAddress("123 Main St, Toronto, ON");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Toronto");
            expect(result.stateAbbreviation).to.equal("ON");
            expect(result.stateName).to.equal("Ontario");
            expect(result.zipCode).to.be.undefined;
            expect(result.zipCodePlusFour).to.be.undefined;
        });

        it('should parse a simple Canadian Address with zip Code', function () {
            const result = addresser.parseAddress("123 Main St, Toronto, ON M3K5K9");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Toronto");
            expect(result.stateAbbreviation).to.equal("ON");
            expect(result.stateName).to.equal("Ontario");
            expect(result.zipCode).to.equal("M3K5K9");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
        it('should parse a simple Canadian Address with Trailing Country', function () {
            const result = addresser.parseAddress("123 Main St, Toronto, ON M3K5K9, Canada");
            expect(result.streetNumber).to.equal("123");
            expect(result.streetName).to.equal("Main");
            expect(result.streetSuffix).to.equal("St");
            expect(result.streetDirection).to.be.undefined;
            expect(result.addressLine1).to.equal("123 Main St");
            expect(result.addressLine2).to.be.undefined;
            expect(result.placeName).to.equal("Toronto");
            expect(result.stateAbbreviation).to.equal("ON");
            expect(result.stateName).to.equal("Ontario");
            expect(result.zipCode).to.equal("M3K5K9");
            expect(result.zipCodePlusFour).to.be.undefined;
        });
    });
});
