import { config } from '@vue-email/compiler'
import { Echo } from '@novu/echo';

const vueEmail = config('templates', {
  verbose: false,
  options: {
  },
})

export const echo = new Echo({
  /**
   * Enable this flag only during local development
   * For production this should be false
   */
  devModeBypassAuthentication: true
});

echo.workflow('hello-world', async ({ step, subscriber  }) => {
  await step.email('send-email', async (inputs) => {
    const template = await vueEmail.render('email.vue', {
      props: inputs
    })

    return {
      subject: "New project is available",
      body: template.html
    }
  }, {
    inputSchema: {
      type: "object",
      properties: {
        showFootnote: {type: "boolean", default: true},
        username: {type: "string", default: "alanturing"},
        userImage: {
          type: "string",
          default:
              "https://react-email-demo-bdj5iju9r-resend.vercel.app/static/vercel-user.png",
          format: "uri",
        },
        invitedByUsername: {type: "string", default: "Alan"},
        invitedByEmail: {
          type: "string",
          default: "alan.turing@example.com",
          format: "email",
        },
        teamName: {type: "string", default: "HVAC"},
        teamImage: {
          type: "string",
          default:
              "https://react-email-demo-bdj5iju9r-resend.vercel.app/static/vercel-team.png",
          format: "uri",
        },
        inviteLink: {
          type: "string",
          default: "https://vercel.com/teams/invite/foo",
          format: "uri",
        },
        inviteFromIp: {type: "string", default: "204.13.186.218"},
        inviteFromLocation: {
          type: "string",
          default: "São Paulo, Brazil",
        },

      },
    }
  });
});


