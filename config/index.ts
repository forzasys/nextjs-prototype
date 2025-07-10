import brannConfig from './config.brann';
import vifConfig from './config.vif';
import shlConfig from './config.shl';
import defaultConfig from './config.default';
import prodSefConfig from './config.prod-sef';
import stagingSefConfig from './config.staging-sef';

// Define type for configuration
type ConfigType = {
  apiUrl: string;
  availableSeasons: string[];
  clubWebsite?: string;
  hasStatisticsPage: boolean;
  league: string | string[];
  leagueWebsite?: string;
  target: string;
  team?: number;
  channel?: number;
  leagueUrlOverride?: (url: URL) => void;
};

// Get configuration based on target environment
let config: ConfigType;

switch (process.env.NEXT_PUBLIC_TARGET) {
    case 'prod-sef':
        config = prodSefConfig;
        break;
    case 'staging-sef':
        config = stagingSefConfig;
        break;
    case 'vif':
        config = vifConfig;
        break;
    case 'brann':
        config = brannConfig;
        break;
    case 'shl':
        config = shlConfig;
        break;
    default:
        config = defaultConfig;
        break;
}

export default config;