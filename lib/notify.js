const axios = require('axios').default;

const TELE_BOT_TOKEN = process.env.TELE_BOT_TOKEN;
const TELE_GROUP_ID = process.env.TELE_GROUP_ID;

const PROJECT_TEMPLATE = `Proyek: ##PROJECT##
Bunga: ##INTEREST##% p.a
Durasi: ##DURATION## Hari
Pengembalian: ##RETURN_TYPE##
Link: ##LINK##\n\n`;

module.exports = async function notify(data) {
  if (!TELE_BOT_TOKEN && !TELE_GROUP_ID) {
    console.log('TELE_BOT_TOKEN & TELE_GROUP_ID is not defined!');
    return;
  }

  const title = 'Ada Proyek Baru!\n\n';
  let projects = '';
  data.forEach(project => {
    projects += PROJECT_TEMPLATE.replace('##PROJECT##', project.title)
      .replace('##INTEREST##', project.interest)
      .replace('##DURATION##', project.duration)
      .replace('##RETURN_TYPE#', project.returnType)
      .replace('##LINK##', project.link);
  });

  return axios.post(`https://api.telegram.org/bot${TELE_BOT_TOKEN}/sendMessage`, undefined, {
    params: {
      chat_id: TELE_GROUP_ID,
      text: `${title}${projects}`,
    },
  });
}
