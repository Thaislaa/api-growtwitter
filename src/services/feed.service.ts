import { FollowService } from "./follow.service.js";
import { TweetService } from "./tweet.service.js";

export class FeedService {
    private tweetService = new TweetService()
    private followService = new FollowService()

    public async list(id: string) {
        const tweets = await this.tweetService.list()
        const following = await this.followService.listFollowingByUser(id)

        const feed = tweets.filter(tweet => {
            return (
                tweet.usuarioId === id ||
                following.some(follow => follow.followerId === tweet.usuarioId)
            )
        })

        return feed
    }
}