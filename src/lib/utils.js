export default {
  getProviderColor (register) {
    return (register.participantType === 'Data Recipient') ? 'orange' : 'purple'
  },
  getProviderLabel (register) {
    return (register.participantType === 'Data Recipient') ? 'Accreditation' : 'Provider'
  }
}
