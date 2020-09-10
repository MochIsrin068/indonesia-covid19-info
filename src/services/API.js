const base_url = "https://indonesia-covid-19.mathdro.id/api";

const API = {
  BASE_URL: base_url,
  BY_CASES: `${base_url}/kasus`,
  BY_CASES_CSV: `${base_url}/kasus.csv`,
  BY_CASES_LINK: `${base_url}/kasus/links.csv"`,
  BY_CASES_OLD: `${base_url}/kasus`,
  BY_PROVINCE: `${base_url}/provinsi`,
  BY_PROVINCE_CSV: `${base_url}/provinsi.csv`,
  BY_DAY: `${base_url}/harian`,
  BY_DAY_CSV: `${base_url}/harian.csv`,
};

export { API };
