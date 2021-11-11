module.exports = {
    getUsuario: /* GraphQL */ `query getUsuario($id: ID!) {
        getUsuario(id: $id) {
          stripeID
        }
      }
      `,

    updateUsuario:/* GraphQL */ `
    mutation UpdateUsuario(
      $input: UpdateUsuarioInput!
    ) {
      updateUsuario(input: $input) {
        id
      }
    }
  `
}