import {
    DashboardsTableName,
    DashboardTable,
    DashboardTabsTable,
    DashboardTabsTableName,
    DashboardTileChartTable,
    DashboardTileChartTableName,
    DashboardTileLoomsTable,
    DashboardTileLoomsTableName,
    DashboardTileMarkdownsTable,
    DashboardTileMarkdownsTableName,
    DashboardTilesTableName,
    DashboardTileTable,
    DashboardTileTypesTableName,
    DashboardVersionsTableName,
    DashboardVersionTable,
    DashboardViewsTableName,
    DashboardViewTable,
} from '../database/entities/dashboards';
import { EmailTable, EmailTableName } from '../database/entities/emails';
import {
    InviteLinkTable,
    InviteLinkTableName,
} from '../database/entities/inviteLinks';
import {
    JobsTable,
    JobsTableName,
    JobStepsTable,
    JobStepsTableName,
} from '../database/entities/jobs';
import {
    OnboardingTable,
    OnboardingTableName,
} from '../database/entities/onboarding';
import {
    OpenIdIdentitiesTable,
    OpenIdIdentitiesTableName,
} from '../database/entities/openIdIdentities';
import {
    OrganizationMembershipsTable,
    OrganizationMembershipsTableName,
} from '../database/entities/organizationMemberships';
import {
    OrganizationTable,
    OrganizationTableName,
} from '../database/entities/organizations';
import {
    PasswordLoginTable,
    PasswordLoginTableName,
} from '../database/entities/passwordLogins';
import {
    PasswordResetTable,
    PasswordResetTableName,
} from '../database/entities/passwordResetLinks';
import {
    PersonalAccessTokenTable,
    PersonalAccessTokenTableName,
} from '../database/entities/personalAccessTokens';
import {
    PinnedChartTable,
    PinnedChartTableName,
    PinnedDashboardTable,
    PinnedDashboardTableName,
    PinnedListTable,
    PinnedListTableName,
    PinnedSpaceTable,
    PinnedSpaceTableName,
} from '../database/entities/pinnedList';
import {
    ProjectMembershipsTable,
    ProjectMembershipsTableName,
} from '../database/entities/projectMemberships';
import {
    CachedExploresTable,
    CachedExploresTableName,
    CachedExploreTable,
    CachedExploreTableName,
    CachedWarehouseTable,
    CachedWarehouseTableName,
    ProjectTable,
    ProjectTableName,
} from '../database/entities/projects';
import {
    SavedChartAdditionalMetricTable,
    SavedChartAdditionalMetricTableName,
    SavedChartCustomDimensionsTable,
    SavedChartCustomDimensionsTableName,
    SavedChartCustomSqlDimensionsTable,
    SavedChartCustomSqlDimensionsTableName,
    SavedChartsTableName,
    SavedChartTable,
    SavedChartTableCalculationTable,
    SavedChartTableCalculationTableName,
    SavedChartVersionFieldsTable,
    SavedChartVersionFieldsTableName,
    SavedChartVersionSortsTable,
    SavedChartVersionSortsTableName,
    SavedChartVersionsTable,
    SavedChartVersionsTableName,
} from '../database/entities/savedCharts';
import { SessionTable, SessionTableName } from '../database/entities/sessions';
import { ShareTable, ShareTableName } from '../database/entities/share';
import {
    SlackAuthTokensTable,
    SlackAuthTokensTableName,
} from '../database/entities/slackAuthentication';
import {
    SpaceTable,
    SpaceTableName,
    SpaceUserAccessTable,
    SpaceUserAccessTableName,
} from '../database/entities/spaces';
import { UserTable, UserTableName } from '../database/entities/users';
import {
    WarehouseCredentialTable,
    WarehouseCredentialTableName,
} from '../database/entities/warehouseCredentials';

import {
    AnalyticsChartViewsTableName,
    AnalyticsDashboardViewsTableName,
    DbAnalyticsChartViews,
    DbAnalyticsDashboardViews,
} from '../database/entities/analytics';
import {
    CatalogTable,
    CatalogTableName,
    CatalogTagsTable,
    CatalogTagsTableName,
    MetricsTreeEdgesTableName,
    type MetricsTreeEdgesTable,
} from '../database/entities/catalog';
import {
    DashboardTileCommentsTable,
    DashboardTileCommentsTableName,
} from '../database/entities/comments';
import {
    DownloadFileTable,
    DownloadFileTableName,
} from '../database/entities/downloadFile';
import {
    EmailOneTimePasscodesTableName,
    EmailOneTimePasscodeTable,
} from '../database/entities/emailOneTimePasscodes';
import {
    GithubAppInstallationTable,
    GithubAppInstallationTableName,
} from '../database/entities/githubAppInstallation';
import {
    GroupMembershipTable,
    GroupMembershipTableName,
} from '../database/entities/groupMemberships';
import { GroupTable, GroupTableName } from '../database/entities/groups';
import {
    NotificationsTable,
    NotificationsTableName,
} from '../database/entities/notifications';
import {
    OrganizationColorPaletteTable,
    OrganizationColorPaletteTableName,
} from '../database/entities/organizationColorPalettes';
import {
    OrganizationAllowedEmailDomainProjectsTable,
    OrganizationAllowedEmailDomainProjectsTableName,
    OrganizationAllowedEmailDomainsTable,
    OrganizationAllowedEmailDomainsTableName,
} from '../database/entities/organizationsAllowedEmailDomains';
import {
    ProjectGroupAccessTable,
    ProjectGroupAccessTableName,
} from '../database/entities/projectGroupAccess';
import {
    ProjectParametersTable,
    ProjectParametersTableName,
} from '../database/entities/projectParameters';
import {
    QueryHistoryTable,
    QueryHistoryTableName,
} from '../database/entities/queryHistory';
import {
    SavedSqlTable,
    SavedSqlTableName,
    SavedSqlVersionsTable,
    SavedSqlVersionsTableName,
} from '../database/entities/savedSql';
import {
    SchedulerEmailTargetTable,
    SchedulerEmailTargetTableName,
    SchedulerLogTable,
    SchedulerLogTableName,
    SchedulerMsTeamsTargetTable,
    SchedulerMsTeamsTargetTableName,
    SchedulerSlackTargetTable,
    SchedulerSlackTargetTableName,
    SchedulerTable,
    SchedulerTableName,
} from '../database/entities/scheduler';
import {
    SpotlightTableConfigTable,
    SpotlightTableConfigTableName,
} from '../database/entities/spotlightTableConfig';
import {
    SshKeyPairTable,
    SshKeyPairTableName,
} from '../database/entities/sshKeyPairs';
import { TagsTable, TagsTableName } from '../database/entities/tags';
import {
    DbGroupUserAttribute,
    DbOrganizationMemberUserAttribute,
    DbUserAttribute,
    GroupUserAttributesTable,
    OrganizationMemberUserAttributesTable,
    UserAttributesTable,
} from '../database/entities/userAttributes';
import {
    ProjectUserWarehouseCredentialPreferenceTable,
    ProjectUserWarehouseCredentialPreferenceTableName,
    UserWarehouseCredentialsTable,
    UserWarehouseCredentialsTableName,
} from '../database/entities/userWarehouseCredentials';
import {
    DbValidationTable,
    ValidationTableName,
} from '../database/entities/validation';
import {
    WarehouseAvailableTablesTable,
    WarehouseAvailableTablesTableName,
} from '../database/entities/warehouseAvailableTables';
import {
    AiAgentToolCallTableName,
    AiAgentToolResultTable,
    AiAgentToolResultTableName,
    AiPromptTable,
    AiPromptTableName,
    AiSlackPromptTable,
    AiSlackPromptTableName,
    AiSlackThreadTable,
    AiSlackThreadTableName,
    AiThreadTable,
    AiThreadTableName,
    AiWebAppPromptTable,
    AiWebAppPromptTableName,
} from '../ee/database/entities/ai';
import {
    AiAgentGroupAccessTable,
    AiAgentGroupAccessTableName,
    AiAgentInstructionVersionsTable,
    AiAgentInstructionVersionsTableName,
    AiAgentIntegrationTableName,
    AiAgentSlackIntegrationTable,
    AiAgentSlackIntegrationTableName,
    AiAgentTable,
    AiAgentTableName,
} from '../ee/database/entities/aiAgent';
import {
    AiAgentUserPreferencesTable,
    AiAgentUserPreferencesTableName,
} from '../ee/database/entities/aiAgentUserPreferences';
import {
    DashboardSummariesTable,
    DashboardSummariesTableName,
} from '../ee/database/entities/dashboardSummaries';
import {
    ServiceAccountsTableName,
    ServiceAccountTable,
} from '../ee/database/entities/serviceAccounts';
import {
    SlackChannelProjectMappingsTable,
    SlackChannelProjectMappingsTableName,
} from '../ee/database/entities/slackChannelProjectMappings';

declare module 'knex/types/tables' {
    interface Tables {
        [InviteLinkTableName]: InviteLinkTable;
        [OrganizationTableName]: OrganizationTable;
        [UserTableName]: UserTable;
        [EmailTableName]: EmailTable;
        [SessionTableName]: SessionTable;
        [WarehouseCredentialTableName]: WarehouseCredentialTable;
        [UserWarehouseCredentialsTableName]: UserWarehouseCredentialsTable;
        [ProjectUserWarehouseCredentialPreferenceTableName]: ProjectUserWarehouseCredentialPreferenceTable;
        [ProjectTableName]: ProjectTable;
        [SavedChartsTableName]: SavedChartTable;
        [SavedChartVersionsTableName]: SavedChartVersionsTable;
        [SavedChartVersionFieldsTableName]: SavedChartVersionFieldsTable;
        [SavedChartVersionSortsTableName]: SavedChartVersionSortsTable;
        [SavedChartTableCalculationTableName]: SavedChartTableCalculationTable;
        [SavedChartAdditionalMetricTableName]: SavedChartAdditionalMetricTable;
        [SavedSqlTableName]: SavedSqlTable;
        [SavedSqlVersionsTableName]: SavedSqlVersionsTable;
        [SpaceTableName]: SpaceTable;
        [DashboardsTableName]: DashboardTable;
        [DashboardVersionsTableName]: DashboardVersionTable;
        [DashboardViewsTableName]: DashboardViewTable;
        [DashboardTilesTableName]: DashboardTileTable;
        [DashboardTileTypesTableName]: DashboardTileTypesTable;
        [DashboardTileChartTableName]: DashboardTileChartTable;
        [DashboardTileLoomsTableName]: DashboardTileLoomsTable;
        [DashboardTileMarkdownsTableName]: DashboardTileMarkdownsTable;
        [OnboardingTableName]: OnboardingTable;
        [OpenIdIdentitiesTableName]: OpenIdIdentitiesTable;
        [OrganizationMembershipsTableName]: OrganizationMembershipsTable;
        [PasswordResetTableName]: PasswordResetTable;
        [PasswordLoginTableName]: PasswordLoginTable;
        [CachedExploresTableName]: CachedExploresTable;
        [CachedExploreTableName]: CachedExploreTable;
        [CachedWarehouseTableName]: CachedWarehouseTable;
        [JobsTableName]: JobsTable;
        [JobStepsTableName]: JobStepsTable;
        [PersonalAccessTokenTableName]: PersonalAccessTokenTable;
        [ProjectMembershipsTableName]: ProjectMembershipsTable;
        [ProjectGroupAccessTableName]: ProjectGroupAccessTable;
        [ShareTableName]: ShareTable;
        [SpaceUserAccessTableName]: SpaceUserAccessTable;
        [SlackAuthTokensTableName]: SlackAuthTokensTable;
        [AnalyticsChartViewsTableName]: DbAnalyticsChartViews;
        [AnalyticsDashboardViewsTableName]: DbAnalyticsDashboardViews;
        [PinnedListTableName]: PinnedListTable;
        [PinnedChartTableName]: PinnedChartTable;
        [PinnedDashboardTableName]: PinnedDashboardTable;
        [PinnedSpaceTableName]: PinnedSpaceTable;
        [SchedulerTableName]: SchedulerTable;
        [SchedulerSlackTargetTableName]: SchedulerSlackTargetTable;
        [SchedulerEmailTargetTableName]: SchedulerEmailTargetTable;
        [SchedulerMsTeamsTargetTableName]: SchedulerMsTeamsTargetTable;
        [EmailOneTimePasscodesTableName]: EmailOneTimePasscodeTable;
        [SchedulerLogTableName]: SchedulerLogTable;
        [OrganizationAllowedEmailDomainsTableName]: OrganizationAllowedEmailDomainsTable;
        [OrganizationAllowedEmailDomainProjectsTableName]: OrganizationAllowedEmailDomainProjectsTable;
        [ValidationTableName]: DbValidationTable;
        [GroupTableName]: GroupTable;
        [GroupMembershipTableName]: GroupMembershipTable;
        [SshKeyPairTableName]: SshKeyPairTable;
        [UserAttributesTable]: DbUserAttribute;
        [OrganizationMemberUserAttributesTable]: DbOrganizationMemberUserAttribute;
        [GroupUserAttributesTable]: DbGroupUserAttribute;
        [SavedChartCustomDimensionsTableName]: SavedChartCustomDimensionsTable;
        [SavedChartCustomSqlDimensionsTableName]: SavedChartCustomSqlDimensionsTable;
        [DownloadFileTableName]: DownloadFileTable;
        [GithubAppInstallationTableName]: GithubAppInstallationTable;
        [DashboardTileCommentsTableName]: DashboardTileCommentsTable;
        [AiThreadTableName]: AiThreadTable;
        [AiSlackThreadTableName]: AiSlackThreadTable;
        [AiPromptTableName]: AiPromptTable;
        [AiSlackPromptTableName]: AiSlackPromptTable;
        [AiWebAppPromptTableName]: AiWebAppPromptTable;
        [AiAgentTableName]: AiAgentTable;
        [AiAgentGroupAccessTableName]: AiAgentGroupAccessTable;
        [AiAgentIntegrationTableName]: AiAgentIntegrationTable;
        [AiAgentSlackIntegrationTableName]: AiAgentSlackIntegrationTable;
        [AiAgentInstructionVersionsTableName]: AiAgentInstructionVersionsTable;
        [AiAgentUserPreferencesTableName]: AiAgentUserPreferencesTable;
        [AiAgentToolCallTableName]: AiAgentToolCallTable;
        [AiAgentToolResultTableName]: AiAgentToolResultTable;
        [DashboardTabsTableName]: DashboardTabsTable;
        [NotificationsTableName]: NotificationsTable;
        [DashboardSummariesTableName]: DashboardSummariesTable;
        [CatalogTableName]: CatalogTable;
        [SlackChannelProjectMappingsTableName]: SlackChannelProjectMappingsTable;
        [WarehouseAvailableTablesTableName]: WarehouseAvailableTablesTable;
        [TagsTableName]: TagsTable;
        [CatalogTagsTableName]: CatalogTagsTable;
        [ServiceAccountsTableName]: ServiceAccountTable;
        [MetricsTreeEdgesTableName]: MetricsTreeEdgesTable;
        [SpotlightTableConfigTableName]: SpotlightTableConfigTable;
        [OrganizationColorPaletteTableName]: OrganizationColorPaletteTable;
        [QueryHistoryTableName]: QueryHistoryTable;
        [ProjectParametersTableName]: ProjectParametersTable;
    }
}
