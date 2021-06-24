const express = require('express');
const app = new express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding;
}

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req,res) => {
    const url = req.query.url;
    if(url) {
        getNLUInstance().analyze({
            features: {
                emotion: {
                    document: true
                }
            },
            url
        }).then((response) => {
            const emotions = response.result.emotion.document.emotion;
            return res.send(emotions);
        });
    } else {
        return res.status(400).send({error: 'No query'})
    }
});

app.get("/url/sentiment", (req,res) => {
    const url = req.query.url;
    if(url) {
        getNLUInstance().analyze({
            features: {
                sentiment: {
                    document: true
                }
            },
            url
        }).then((response) => {
            const label = response.result.sentiment.document.label;
            return res.send(label);
        });
    } else {
        return res.status(400).send({error: 'No query'})
    }
});

app.get("/text/emotion", (req,res) => {
    const text = req.query.text;
    if(text) {
        getNLUInstance().analyze({
            features: {
                emotion: {
                    document: true
                }
            },
            text
        }).then((response) => {
            const emotions = response.result.emotion.document.emotion;
            return res.send(emotions);
        });
    } else {
        return res.status(400).send({error: 'No query'})
    }
});

app.get("/text/sentiment", (req,res) => {
    const text = req.query.text;
    if(text) {
        getNLUInstance().analyze({
            features: {
                sentiment: {
                    document: true
                }
            },
            text
        }).then((response) => {
            const label = response.result.sentiment.document.label;
            return res.send(label);
        });
    } else {
        return res.status(400).send({error: 'No query'})
    }
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})