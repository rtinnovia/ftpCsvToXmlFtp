function template(LMT_TYPE, HR, NUMDHL, NOM, DATE) {
    return `<?xml version="1.0" encoding="utf-8"?>
  <ns:ExtractAction xmlns:ns="http://dgff.dhl.com/cdm/5" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://dgff.dhl.com/cdm/5">
      <ns:Action ns:cmdversion="5.18">
          <ns:ChangeStatus>
          <ns:Reason>
              <ns:ID>${LMT_TYPE}</ns:ID>
          </ns:Reason>
          </ns:ChangeStatus>
          <ns:Origin>
          <ns:Sender>
              <ns:ID>INNOVIA</ns:ID>
          </ns:Sender>
          </ns:Origin>
          <ns:Destination>
          <ns:Recipient>
              <ns:ID>ESP</ns:ID>
          </ns:Recipient>
          </ns:Destination>
          <ns:Audit>
              <ns:MessageID>INNOVIA</ns:MessageID>
              <ns:CreationDateTime>${DATE}</ns:CreationDateTime> 
          </ns:Audit>
          <ns:MessageAttribute>
          <ns:Attribute key="MessageType">Simple</ns:Attribute>
          </ns:MessageAttribute>
      </ns:Action>
      <ns:Extract>
          <ns:Event ns:refid="EV1">
          <ns:Identification>
              <ns:ID>${LMT_TYPE}</ns:ID>
          </ns:Identification>
          <ns:EventDateTime>${HR}</ns:EventDateTime>
          <ns:References>
              <ns:Reference ns:type="HBN">${NUMDHL}</ns:Reference>
          </ns:References>
          <ns:Note ns:qualifier="SignatoryName">${NOM}</ns:Note>
          </ns:Event>
      </ns:Extract>
  </ns:ExtractAction>`;
  }
  
  module.exports = template;