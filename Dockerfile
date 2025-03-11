
FROM node:18

WORKDIR /app

COPY script.js /app/script.js

CMD ["node", "script.js"]
