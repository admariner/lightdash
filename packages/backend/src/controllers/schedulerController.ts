import {
    AnyType,
    ApiErrorPayload,
    ApiJobStatusResponse,
    ApiScheduledJobsResponse,
    ApiSchedulerAndTargetsResponse,
    ApiSchedulerLogsResponse,
    ApiSchedulersResponse,
    ApiTestSchedulerResponse,
    KnexPaginateArgs,
    SchedulerJobStatus,
} from '@lightdash/common';
import {
    Body,
    Delete,
    Get,
    Middlewares,
    OperationId,
    Patch,
    Path,
    Post,
    Query,
    Request,
    Response,
    Route,
    SuccessResponse,
    Tags,
} from '@tsoa/runtime';
import express from 'express';
import {
    allowApiKeyAuthentication,
    isAuthenticated,
    unauthorisedInDemo,
} from './authentication';
import { BaseController } from './baseController';

@Route('/api/v1/schedulers')
@Response<ApiErrorPayload>('default', 'Error')
@Tags('Schedulers')
export class SchedulerController extends BaseController {
    /**
     * Get scheduled logs
     * @param req express request
     */
    @Middlewares([allowApiKeyAuthentication, isAuthenticated])
    @SuccessResponse('200', 'Success')
    @Get('/{projectUuid}/logs')
    @OperationId('getSchedulerLogs')
    async getLogs(
        @Path() projectUuid: string,

        @Request() req: express.Request,
    ): Promise<ApiSchedulerLogsResponse> {
        this.setStatus(200);
        return {
            status: 'ok',
            results: await this.services
                .getSchedulerService()
                .getSchedulerLogs(req.user!, projectUuid),
        };
    }

    /**
     * List all schedulers with pagination, search, and sorting
     * @param req express request
     * @param projectUuid
     * @param pageSize number of items per page
     * @param page page number
     * @param searchQuery search query to filter schedulers by name
     * @param sortBy column to sort by
     * @param sortDirection sort direction (asc or desc)
     */
    @Middlewares([allowApiKeyAuthentication, isAuthenticated])
    @SuccessResponse('200', 'Success')
    @Get('/{projectUuid}/list')
    @OperationId('ListSchedulers')
    async getSchedulers(
        @Request() req: express.Request,
        @Path() projectUuid: string,
        @Query() pageSize?: number,
        @Query() page?: number,
        @Query() searchQuery?: string,
        @Query() sortBy?: 'name',
        @Query() sortDirection?: 'asc' | 'desc',
    ): Promise<ApiSchedulersResponse> {
        this.setStatus(200);
        let paginateArgs: KnexPaginateArgs | undefined;

        if (pageSize && page) {
            paginateArgs = {
                page,
                pageSize,
            };
        }

        let sort: { column: string; direction: 'asc' | 'desc' } | undefined;
        if (sortBy && sortDirection) {
            sort = {
                column: sortBy,
                direction: sortDirection,
            };
        }

        return {
            status: 'ok',
            results: await this.services
                .getSchedulerService()
                .getSchedulers(
                    req.user!,
                    projectUuid,
                    paginateArgs,
                    searchQuery,
                    sort,
                ),
        };
    }

    /**
     * Get a scheduler
     * @param schedulerUuid The uuid of the scheduler to update
     * @param req express request
     */
    @Middlewares([allowApiKeyAuthentication, isAuthenticated])
    @SuccessResponse('200', 'Success')
    @Get('{schedulerUuid}')
    @OperationId('getScheduler')
    async get(
        @Path() schedulerUuid: string,
        @Request() req: express.Request,
    ): Promise<ApiSchedulerAndTargetsResponse> {
        this.setStatus(200);
        return {
            status: 'ok',
            results: await this.services
                .getSchedulerService()
                .getScheduler(req.user!, schedulerUuid),
        };
    }

    /**
     * Update a scheduler
     * @param schedulerUuid The uuid of the scheduler to update
     * @param req express request
     * @param body the new scheduler data
     */
    @Middlewares([
        allowApiKeyAuthentication,
        isAuthenticated,
        unauthorisedInDemo,
    ])
    @SuccessResponse('201', 'Updated')
    @Patch('{schedulerUuid}')
    @OperationId('updateScheduler')
    async patch(
        @Path() schedulerUuid: string,
        @Request() req: express.Request,
        @Body() body: AnyType, // TODO: It should be UpdateSchedulerAndTargetsWithoutId but tsoa returns an error
    ): Promise<ApiSchedulerAndTargetsResponse> {
        this.setStatus(200);
        return {
            status: 'ok',
            results: await this.services
                .getSchedulerService()
                .updateScheduler(req.user!, schedulerUuid, body),
        };
    }

    /**
     * Set scheduler enabled
     * @param schedulerUuid The uuid of the scheduler to update
     * @param req express request
     * @param body the enabled flag
     */
    @Middlewares([
        allowApiKeyAuthentication,
        isAuthenticated,
        unauthorisedInDemo,
    ])
    @SuccessResponse('201', 'Updated')
    @Patch('{schedulerUuid}/enabled')
    @OperationId('updateSchedulerEnabled')
    async patchEnabled(
        @Path() schedulerUuid: string,
        @Request() req: express.Request,
        @Body() body: { enabled: boolean },
    ): Promise<ApiSchedulerAndTargetsResponse> {
        this.setStatus(200);
        return {
            status: 'ok',
            results: await this.services
                .getSchedulerService()
                .setSchedulerEnabled(req.user!, schedulerUuid, body.enabled),
        };
    }

    /**
     * Delete a scheduler
     * @param schedulerUuid The uuid of the scheduler to delete
     * @param req express request
     */
    @Middlewares([
        allowApiKeyAuthentication,
        isAuthenticated,
        unauthorisedInDemo,
    ])
    @SuccessResponse('201', 'Deleted')
    @Delete('{schedulerUuid}')
    @OperationId('deleteScheduler')
    async delete(
        @Path() schedulerUuid: string,
        @Request() req: express.Request,
    ): Promise<{
        status: 'ok';
        results: undefined;
    }> {
        this.setStatus(200);
        await this.services
            .getSchedulerService()
            .deleteScheduler(req.user!, schedulerUuid);
        return {
            status: 'ok',
            results: undefined,
        };
    }

    /**
     * Get scheduled jobs
     * @param schedulerUuid The uuid of the scheduler to update
     * @param req express request
     */
    @Middlewares([allowApiKeyAuthentication, isAuthenticated])
    @SuccessResponse('200', 'Success')
    @Get('{schedulerUuid}/jobs')
    @OperationId('getScheduledJobs')
    async getJobs(
        @Path() schedulerUuid: string,
        @Request() req: express.Request,
    ): Promise<ApiScheduledJobsResponse> {
        this.setStatus(200);
        return {
            status: 'ok',
            results: await this.services
                .getSchedulerService()
                .getScheduledJobs(req.user!, schedulerUuid),
        };
    }

    /**
     * Get a generic job status
     * This method can be used when polling from the frontend
     * @param jobId the jobId for the status to check
     * @param req express request
     */
    @Middlewares([allowApiKeyAuthentication, isAuthenticated])
    @SuccessResponse('200', 'Success')
    @Get('job/{jobId}/status')
    @OperationId('getSchedulerJobStatus')
    async getSchedulerStatus(
        @Path() jobId: string,
        @Request() req: express.Request,
    ): Promise<ApiJobStatusResponse> {
        this.setStatus(200);
        const { status, details } = await this.services
            .getSchedulerService()
            .getJobStatus(req.user!, jobId);
        return {
            status: 'ok',
            results: {
                status: status as SchedulerJobStatus,
                details,
            },
        };
    }

    /**
     * Send a scheduler now before saving it
     * @param req express request
     * @param body the create scheduler data
     */
    @Middlewares([
        allowApiKeyAuthentication,
        isAuthenticated,
        unauthorisedInDemo,
    ])
    @SuccessResponse('200', 'Success')
    @Post('send')
    @OperationId('sendScheduler')
    async post(
        @Request() req: express.Request,
        @Body() body: AnyType, // TODO: It should be CreateSchedulerAndTargets but tsoa returns an error
    ): Promise<ApiTestSchedulerResponse> {
        this.setStatus(200);

        return {
            status: 'ok',
            results: {
                jobId: (
                    await this.services
                        .getSchedulerService()
                        .sendScheduler(req.user!, body)
                ).jobId,
            },
        };
    }
}
