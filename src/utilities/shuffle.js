//combine and shuffle 2 arrays
const shuffle = () => {
    const assets = [{ image: '/assets/css.png' },
    { image: '/assets/html5.png' },
    { image: '/assets/jquery.png' },
    { image: '/assets/js.png' },
    { image: '/assets/next.png' },
    { image: '/assets/node.png' },
    { image: '/assets/react.png' },
    { image: '/assets/ts.png' }];

    let combinedArray = [...assets, ...assets];
    let shuffledArray = combinedArray
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));//attach id to each card
    return shuffledArray;
};

export default shuffle;