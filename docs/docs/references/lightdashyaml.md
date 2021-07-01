---
sidebar_position: 6
---

# Lightdash.yml

A `lightdash.yml` is necessary to launch Lightdash, although for most people, the
default supplied `lightdash.yml` (used automatically) is just fine.

A `lightdash.yml` file contains multiple projects, although currently only the first
project in the list is used to configure lightdash. 

Here is a full example of a valid `lightdash.yml` containing two different project
types:
```yaml
version: '1.0'

projects:
  - type: 'dbt'
    name: myproject
    project_dir: /path/to/your/dbt/project
    profiles_dir: /path/to/your/dbt/profiles
    rpc_server_port: 8580

  - type: 'dbt_remote_server'
    name: myotherproject
    rpc_server_host: localhost
    rpc_server_port: 8580
```

## Environment variables

You can override any project config item using environment variables. For example:

1. Update the `project_dir` of the first project: `LIGHTDASH_PROJECT_0_PROJECT_DIR`
2. Update the `rpc_server_host` of the second project: `LIGHTDASH_PROJECT_1_RPC_SERVER_HOST`

**Environment variables always take precedence over values in the `lightdash.yml` file**
