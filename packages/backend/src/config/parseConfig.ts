import Ajv from "ajv";
import addFormats from "ajv-formats";
import lightdashV1JsonSchema from "../jsonSchemas/lightdashConfig/v1.json";
import {ParseError} from "../errors";

enum ProjectType {
    DBT = 'dbt',
    DBT_REMOTE_SERVER = 'dbt_remote_server'
}

interface ProjectConfig {
    type: ProjectType;
    name: string;
}

interface DbtLocalProjectConfig extends ProjectConfig {
    type: ProjectType.DBT;
    profiles_dir: string;
    project_dir: string;
    rpc_server_port: number;
}

interface DbtRemoteProjectConfig extends ProjectConfig {
    type: ProjectType.DBT_REMOTE_SERVER;
    name: string;
    rpc_server_host: string;
    rpc_server_port: number;
}

export type LightdashConfigIn = {
    version: '1.0';
    projects: Array<ProjectConfig>;
};

export type LightdashConfig = {
    version: '1.0';
    projects: Array<DbtLocalProjectConfig|DbtRemoteProjectConfig>;
};

const isDbtLocalProjectConfig = (config: ProjectConfig): config is DbtLocalProjectConfig => {
    return config.type === ProjectType.DBT;
}

const isDbtRemoteProjectConfig= (config: ProjectConfig): config is DbtRemoteProjectConfig => {
    return config.type === ProjectType.DBT_REMOTE_SERVER;
}

const dbtLocalProjectConfigRequiredFields: Array<keyof DbtLocalProjectConfig> = ['type', 'name', 'profiles_dir', 'project_dir', 'rpc_server_port'];
const dbtRemoteProjectConfigRequiredFields: Array<keyof DbtRemoteProjectConfig> = ['type', 'name', 'rpc_server_host', 'rpc_server_port'];

const mergeProjectWithEnvironment = <T extends ProjectConfig>(projectIndex: number, project: T, requiredField: Array<keyof T>,): T => {
    return requiredField.reduce((prev, key) => {
        const envKey = `LIGHTDASH_PROJECT_${projectIndex}_${key}`.toUpperCase();
        const value = process.env[envKey] || project[key];
        if (value === undefined) {
            throw new ParseError(`Lightdash config file successfully loaded but invalid: Project index: ${projectIndex} must have ${key} or environment variable ${envKey}.`, {});
        }
        return {
            ...prev,
            [key]: value
        };
    }, project);
}

const mergeWithEnvironment = (config: LightdashConfigIn): LightdashConfig => {
    const mergedProjects = config.projects.map((project, idx) => {
        if (isDbtLocalProjectConfig(project)) {
            return mergeProjectWithEnvironment(idx, project, dbtLocalProjectConfigRequiredFields);
        } else if(isDbtRemoteProjectConfig(project)){
            return mergeProjectWithEnvironment(idx, project, dbtRemoteProjectConfigRequiredFields);
        } else {
            throw new ParseError(`Lightdash config file successfully loaded but invalid: Project type: ${project.type} is not supported`, {});
        }
    })
    return {
        ...config,
        projects: mergedProjects,
    }
};

export const parseConfig = (raw: any): LightdashConfig => {
    const ajv = new Ajv({schemaId: 'id', useDefaults: true, discriminator: true});
    addFormats(ajv);
    const validate = ajv.compile<LightdashConfigIn>(lightdashV1JsonSchema);
    if (validate(raw)) {
        return mergeWithEnvironment(raw);
    } else {
        const lineErrorMessages = (validate.errors || []).map(err => `Field at ${err.instancePath} ${err.message}`).join('\n')
        throw new ParseError(`Lightdash config file successfully loaded but invalid: ${lineErrorMessages}`, {});
    }
}
