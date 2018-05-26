export default [
  {
    stepTitle: 'Why would you like to join us?',
    stepDescription: 'Tell us a bit more about yourself',
    schema: {
      type: "object",
      title: "Lets get to know each other.",
      // required: ["bikesHousehold", "reasons"],
      properties: {
        bikesHousehold: { type: "number", title: "How many bikes in your household?" },
        primaryBike: { type: "string", title: "What type of bike do you ride the most?", enum: ["Road/racer", "Hybrid", "Mountain", "Cruiser", "Ladies", "Gents", "Fixie/Single Speed"] },
        workStatus: { type: "string", title: "Work status", enum: ["Full Time", "Part Time", "Pension/Disability", "Unemployed", "Student", "Retired"] },
        reasons: { type: "string", title: "Reasons for volunteering" }
      }
    },
    uiSchema: {
      bikesHousehold: {
        "ui:widget": "updown",
        "ui:placeholder": "Enter the number of bikes you own",
        "ui:autofocus": true,
      },
      primaryBike: {
        "ui:widget": "select",
        "ui:placeholder": "Select a type of bike",
      },
      workStatus: {
        "ui:widget": "select",
        "ui:placeholder": "Select your employment status",
      },
      reasons: {
        "ui:widget": "textarea",
        "ui:placeholder": "Some good starting points:\nWhat makes you want to to volunteer at Back2Bikes?\nHave you ever done any other volunteering before?\nHave you worked on bikes or something similar before?",
        "ui:options": {
          "rows": 12
        }
      }
    }
  },
  {
    stepTitle: 'Your Details',
    stepDescription: 'Contact Details',
    schema: {
      title: "Details",
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", title: "Name" },
        email: { type: "string", format: "email", title: "Email" },
        addressStreet: { type: "string", title: "Street Address" },
        addressSuburb: { type: "string", title: "Suburb" },
        addressState: { type: "string", title: "State", default: "VIC", enum: ["VIC", "NSW", "SA", "QLD", "NT", "WA", "TAS"] },
        addressPostcode: { type: "number", title: "Postcode" },
        phone: { type: "string", title: "Phone number" },
        mobile: { type: "string", title: "Mobile number" },
      }
    },
    uiSchema: {
      name: {
        "ui:placeholder": "Enter your name",
        "ui:autofocus": true,
      },
      phone: {
        "ui:options": {
          inputType: 'tel'
        }
      },
      mobile: {
        "ui:options": {
          inputType: 'tel'
        }
      },
    }
  },
  {
    stepTitle: 'Emergency Contact',
    stepDescription: 'Just in case',
    schema: {
      type: "object",
      title: "Who should we contact in an emergency?",
      // required: ["emergencyContact"],
      properties: {
        emergencyContact: { type: "string", title: "Full name" },
        emergencyEmail: { type: "string", title: "Email" },
        emergencyPhone: { type: "string", title: "Mobile number" },
      },
    },
    uiSchema: {
      emergencyContact: {
        "ui:placeholder": "Enter your emergency contact's full name",
        "ui:autofocus": true,
      },
      emergencyEmail: {
        "ui:placeholder": "Enter your emergency contact's email"
      },
      emergencyPhone: {
        "ui:placeholder": "Enter your emergency contact's mobile or phone number",
        "ui:options": {
          inputType: 'tel'
        }
      },
    }
  }
]
