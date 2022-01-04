async function main() {
    const DragonStreetNFT = await ethers.getContractFactory('DragonStreetNFT');

    // Start deployment, returning a promise that resolves to a contract object
    const dragonStreetNFT = await DragonStreetNFT.deploy();
    console.log('Contract deployed to address:', dragonStreetNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    });
