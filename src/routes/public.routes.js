const express = require('express');
const router = express.Router();
const db = require('../databases/db');
const imageMappings = {
    Twitter: '/static/icons/Twitter.png',
    Facebook: '/static/icons/facebook.png',
    Instagram: '/static/icons/instagram.png',
    Snapchat: '/static/icons/snapchat.png',
    Tik_Tok: '/static/icons/tiktok.png',
    Reddit: '/static/icons/reddit.png',
    Twitch: '/static/icons/twitch.png',
    Tumblr: '/static/icons/tumblr.png',
    Youtube: '/static/icons/youtube.png',
    Kick: '/static/icons/kick.png',
    Wattpad: '/static/icons/wattpad.png',
    Skype: '/static/icons/skype.png',
    Telegram: '/static/icons/telegram.png',
    Bussines: '/static/icons/business.png',
    Line: '/static/icons/line.png',
    Discord: '/static/icons/discord.png',
    Gmail: '/static/icons/gmail.png',
    Telefono: '/static/icons/phone.png',
    Mensajes: '/static/icons/messages.png',
    Email: '/static/icons/email.png',
    Contacto: '/static/icons/contact.png',
    Venmo: '/static/icons/venmo.png',
    Revoult: '/static/icons/revoult.png',
    Cashapp: '/static/icons/cashapp.png',
    Monzo: '/static/icons/monzo.png',
    Paypal: '/static/icons/paypal.png',
    Upwork: '/static/icons/upwork.png',
    Xing: '/static/icons/xing.png',
    Github: '/static/icons/github.png',
    VSCO: '/static/icons/vsco.png',
    Freelancer: '/static/icons/freelancer.png',
    Behance: '/static/icons/behance.png',
    Patreon: '/static/icons/patreon.png',
    Dribbble: '/static/icons/dribbble.png',
    Pinterest: '/static/icons/pinterest.png',
    Quora: '/static/icons/quora.png',
    Babbel_plus: '/static/icons/babbel.png',
    Flickr: '/static/icons/flickr.png',
    Fiverr: '/static/icons/fiverr.png',
    Soundcloud: '/static/icons/soundcloud.png',
    Tidal: '/static/icons/tidal.png',
    Apple_Music: '/static/icons/applemusic.png',
    Spotify: '/static/icons/spotify.png',
    Yandex_music: '/static/icons/yandex-music.png',
    Maps: '/static/icons/googlemaps.png',
    Tripadvisor: '/static/icons/tripadvisor.png',
    Yelp: '/static/icons/yelp.png',
    Blogger: '/static/icons/blogger.png',
    Meetup: '/static/icons/meetup.png',
    Clubhouse: '/static/icons/clubhouse.png',
    Eventbrite: '/static/icons/eventbrite.png',
    Calendly: '/static/icons/calendly.png',
    Onlyfans: '/static/icons/onlyfans.png',
    Tinder: '/static/icons/tinder.png',
    Amazon: '/static/icons/amazon.png',
    Linkedin: '/static/icons/linkedin.png',
    Whatsapp: '/static/icons/whatsapp.png',
  }

router.get('/:nickname', async (req, res) => {
    const nickname = req.params.nickname;

    try {
        // Wait for the promise to resolve
        const userData = await db.getNickData(nickname);

        if (Array.isArray(userData) && userData.length > 0) {
            const id_user = userData[0].id;

            console.log(id_user)

            const linksUser = await db.getLinksWithColumnNames(id_user);

            console.log(linksUser)

            // Render the user page with the corresponding data
            res.render('plantilla', { userData, linksUser, imageMappings });
        } else {
            // Render a custom "not found" template instead of redirecting to an error page
            res.status(400);
        }
    } catch (error) {
        // Handle errors if the promise is rejected
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;