import ky from 'ky'

export type CardItem = {
  mission_patch_small?: string;
  mission_patch?: string;
  mission_name?: string;
  rocket_name?: string;
  details?: string;
};

export interface LaunchApi {
  links?: {
    mission_patch?: string;
    mission_patch_small?: string;
  };
  mission_name: string;
  rocket?: {
    rocket_name?: string;
  };
  details?: string;
}

export default class SpaceXApi {
  _baseUrl = 'https://api.spacexdata.com/v3/launches?launch_year=2020'

  async getJsonList(): Promise<LaunchApi[]> {
    const jsonList = await ky.get(this._baseUrl).json<LaunchApi[]>()
    return jsonList
  }
}