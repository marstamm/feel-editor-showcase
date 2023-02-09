export const context =
{
  "Activity_0pn4zut": 
  [
    {
      name: 'response',
      type: 'Context',
      info: 'Response from the API',
      entries: [
        {
          name: 'id',
          type: 'Number',
          info: 'The customer ID'
        },
        {
          name: 'name',
          type: 'String',
          info: '"Jon Doe"'
        },
        {
          name: 'dob',
          type: 'String',
          info: 'Date of Birth'
        },
        {
          name: 'contact',
          type: 'Context',
          info: 'Contact information',
          entries: [
            {
              name: 'email',
              type: 'String',
              info: 'john.doe@company.tld'
            },
            {
              name: 'Phone',
              type: 'String',
              info: '+1 555 123 4567'
            },
            {
              name: 'Address',
              type: 'String',
              info: '123 Main Street, Anytown, USA'
            }
          ]
        }
      ]
    }
  ]
}