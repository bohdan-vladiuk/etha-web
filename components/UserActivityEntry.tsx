import _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { Image } from 'react-bootstrap';
import { UserActivity } from '../models';

interface UserActivityEntryProps {
    activity: UserActivity;
}

export const UserActivityEntry: React.FC<UserActivityEntryProps> = (props: UserActivityEntryProps) => {
    const history = useRouter();
    // const [post, setPostData] = useState<Post>(props.post);

    function getActivityImage(): string {
        if (!_.isEmpty(props.activity.vote)) {
            if (props.activity.vote?.value === true) {
                return '/profile/thumbs_up.png';
            } else {
                return '/profile/thumbs_down.png';
            }
        }
        if (!_.isEmpty(props.activity.comment)) {
            return '/icons/comment.png';
        }
        return '';
    }
    // function getActivityText(): string {
    //     if (props.activity.voteId !== undefined) {
    //         if (props.activity.vote?.value === true) {
    //             return 'You Agreed on ';
    //         } else {
    //             return 'You Disagreed on ';
    //         }
    //     }
    //     if (props.activity.commentId !== undefined) {
    //         return 'You Commented on ';
    //     }
    //     return '';
    // }
    function getActivityFilter(): string {
        if (!_.isEmpty(props.activity.vote)) {
            if (props.activity.vote?.value === true) {
                return 'invert(21%) sepia(78%) saturate(4550%) hue-rotate(116deg) brightness(92%) contrast(101%)';
            } else {
                return 'invert(24%) sepia(94%) saturate(6418%) hue-rotate(356deg) brightness(101%) contrast(119%)';
            }
        }
        if (!_.isEmpty(props.activity.comment)) {
            return 'invert(51%) sepia(11%) saturate(22%) hue-rotate(314deg) brightness(81%) contrast(81%)';
        }
        return '';
    }
    function returnTime() {
        if (!_.isEmpty(props.activity.updatedAt)) {
            return moment(props.activity.updatedAt).utc(true).fromNow();
        }
        return moment(props.activity.createdAt).utc(true).fromNow();
    }
    return (
        <>
            <div
                className="px-1 py-2"
                style={{
                    width: '45%',
                    borderRadius: '20px',
                    background: '#fff',
                    boxShadow: '#00000070 0px 3px 6px 0px',
                    minHeight: '90px',
                    margin: '5px',
                    textAlign: 'start',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
                onClick={() => history.push('/post/' + props.activity.post.tag)}
            >
                <div className="d-flex w-100" style={{ justifyContent: 'center', position: 'relative' }}>
                    <Image
                        className="activity-image-container"
                        src={props.activity.post.user?.imageUrl}
                        style={{ width: '52px', height: '52px', position: 'relative', left: '8px' }}
                        alt=""
                    />
                    <div
                        className="d-flex"
                        style={{
                            width: '50px',
                            height: '50px',
                            borderWidth: '2px',
                            border: 'solid #f6f6f6',
                            borderRadius: '100%',
                            background: '#fefefe',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            left: '-8px',
                        }}
                    >
                        <Image
                            className=""
                            src={getActivityImage()}
                            alt=""
                            height={30}
                            width={30}
                            style={{ filter: getActivityFilter() }}
                        />
                    </div>
                </div>
                <p
                    className="pb-1 w-100 mt-2 mb-0"
                    style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: 'black',
                        textJustify: 'inter-word',
                        textAlign: 'center',
                    }}
                >
                    {props.activity.post.user?.name}
                </p>
                <p
                    className="pb-1 w-100 pt-0 mt-0 px-2 mb-0"
                    style={{
                        fontSize: '12px',
                        color: 'black',
                        textJustify: 'inter-word',
                        textAlign: 'justify',
                    }}
                >
                    {props.activity.post.text?.substr(0, 50) + '...'}
                </p>
                <div className="d-flex pr-3 w-100" style={{ justifyContent: 'flex-end', fontSize: '12px' }}>
                    {returnTime()}
                </div>
            </div>
        </>
    );
};
