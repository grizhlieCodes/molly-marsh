export const insertEmailWithTemplate = (emailContent) => {
	return `<!DOCTYPE html>
<html
  lang="en"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <style type="text/css">
      @media screen and (max-width: 600px) {
        .mobile-padding {
          padding: 20px !important;
        }
        .mobile-text {
          font-size: 24px !important;
        }
        .content-table {
          width: 100% !important;
          max-width: 100% !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #eff8f6">
    <table
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="background-color: #eff8f6"
    >
      <tr>
        <td>
          <table
            class="content-table"
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
              background-color: #ffffff;
              max-width: 600px;
              width: 100%;
              margin: 0 auto;
            "
          >
            <tr>
              <td
                class="mobile-padding"
                style="padding: 40px 32px; text-align: left"
              >
                ${emailContent}
                <p
                  style="
                    color: #101112;
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 0 0 8px 0;
                  "
                >
                  Best wishes,
                </p>
                <p
                  style="
                    color: #101112;
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 0 0 24px 0;
                  "
                >
                  Molly
                </p>

                <div
                  style="
                    text-align: left;
                    padding: 20px 0;
                    font-family: Arial, sans-serif;
                  "
                >
                  <img
                    src="cid:unique@signature.img"
                    alt="Molly Marsh"
                    style="
                      width: 100px;
                      height: 100px;
                      border-radius: 50%;
                      margin-bottom: 24px;
                    "
                  />
                  <div>
                    <span
                      style="font-size: 16px; font-weight: bold; color: #18181b"
                      >Molly Marsh</span
                    >
                    <span style="color: #46464d; font-size: 13px"
                      >(She/Her)</span
                    >
                  </div>
                  <div
                    style="
                      color: #46464d;
                      font-weight: 500;
                      margin: 8px 0 16px 0;
                    "
                  >
                    Transformative Life Coach
                  </div>
                  <div
                    style="
                      border-top: 1px solid #d4d4d8;
                      width: 200px;
                      margin: 16px 0;
                    "
                  ></div>
                  <a
                    href="http://www.mollymarshcoaching.com"
                    style="color: #235247; text-decoration: none"
                    >www.mollymarshcoaching.com</a
                  >
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>


`;
};
