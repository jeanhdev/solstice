interface Row {
  [key: string]: string;
}

export const retrieveCsvCompanyNameAndChannel = (
  row: Row,
): {
  csvCompanyName: string | undefined;
  csvChannel: string | undefined;
} => {
  const companyKeys = [
    /^name$/i,
    /^company(_name)?$/i,
    /^account$/i,
    /^client(_name)?$/i,
    /^customer(_name)?$/i,
    /^organization(_name)?$/i,
    /^business(_name)?$/i,
    /^brand(_name)?$/i,
    /^company(_name)?$/i,
    /^client(_name)?$/i,
    /^companies(_name)?$/i,
  ]; // Possible regular expressions for company name keys
  const channelKeys = [
    /^source$/i,
    /^origin$/i,
    /^channel$/i,
    /^ad(s)?$/i,
    /^medium$/i,
  ]; // Possible regular expressions for channel keys

  // Search for company name and channel using regular expressions for possible keys
  let csvCompanyName: string | undefined = "";
  let csvChannel: string | undefined = "";
  for (const key in row) {
    for (const companyKey of companyKeys) {
      if (companyKey.test(key)) {
        csvCompanyName = row[key];
        break;
      }
    }
    for (const channelKey of channelKeys) {
      if (channelKey.test(key)) {
        csvChannel = row[key];
        break;
      }
    }
    if (csvCompanyName && csvChannel) {
      break;
    }
  }

  return { csvCompanyName, csvChannel };
};
