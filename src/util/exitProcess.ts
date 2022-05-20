const exitProcess = (exitCode: number = 1, error?: any) => {
    if (error) console.error(error);

    return process.exit(exitCode);
}

export default exitProcess;
