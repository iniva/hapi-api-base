const username = process.env.SLACK_WEBHOOK_BOT_NAME || 'Hapi API Bot';

const getAuthorDetails = author => {
    const { login, html_url, avatar_url } = author;

    return {
        author_name: login,
        author_link: html_url,
        author_icon: avatar_url
    };
};

export const release = payload => {
    const { release: { html_url, tag_name, author, published_at }, repository } = payload;
    const authorDetails = getAuthorDetails(author);
    const repoName = repository.full_name.split('/').pop();

    return {
        username,
        attachments: [
            {
                fallback: `Release ${tag_name} published for ${repoName}`,
                pretext: `New Release Published for *${repoName}*`,
                color: '#36a64f',
                ...authorDetails,
                title: `Release ${tag_name}`,
                title_link: html_url,
                ts: Date.parse(published_at) / 1000 // eslint-disable-line no-magic-numbers
            }
        ]
    };
};
