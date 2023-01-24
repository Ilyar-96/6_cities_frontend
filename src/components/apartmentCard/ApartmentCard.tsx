import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ApartmentCardProps } from './ApartmentCard.type';
import { APPRoute, FetchStatus } from '../../const';
import { Rating } from '../rating/Rating';
import noImagePreviewUrl from '../../assets/img/noImagePreview.jpg';
import { addingFavoriteOfferHandler as addFavoriteOfferHandler, getImageAbsoluteUrl, getIsFavorite } from "../../utils";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoritesStatus, getUserFavorites, getUserData } from '../../store/user/selectors';

export const ApartmentCard: React.FC<ApartmentCardProps> = ({ data, className, ...props }) => {
	const dispatch = useAppDispatch();
	const favoritesStatus = useAppSelector(getFavoritesStatus);
	const previewImageUrl = data.previewImage ? getImageAbsoluteUrl(data.previewImage) : noImagePreviewUrl;
	const favoritesList = useAppSelector(getUserFavorites);
	const user = useAppSelector(getUserData);

	return (
		<div className={cn(className, "place-card")} {...props}>
			{data.isPremium && <div className="place-card__mark">
				<span>Premium</span>
			</div>}
			<div className="place-card__image-wrapper">
				<Link to={`${APPRoute.APARTMENT}/${data._id}`}>
					<img className="place-card__image" src={previewImageUrl} width={260} height={200} alt="" />
				</Link>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">€{data.price}</b>
						<span className="place-card__price-text">/&nbsp;night</span>
					</div>
					<button className={cn(
						"place-card__bookmark-button",
						" button",
						{ "place-card__bookmark-button--active": getIsFavorite(favoritesList, data._id) })}
						disabled={favoritesStatus === FetchStatus.PENDING}
						onClick={() => addFavoriteOfferHandler(dispatch, data._id, user, favoritesList)}
						type="button"
					>
						<svg className="place-card__bookmark-icon" width={18} height={19}>
							<use xlinkHref="#icon-bookmark" />
						</svg>
						<span className="visually-hidden">{data.isFavorite ? "In bookmarks" : "To bookmarks"}</span>
					</button>
				</div>
				<Rating value={data.rating} size="s" />
				<h2 className="place-card__name">
					<Link to={`${APPRoute.APARTMENT}/${data._id}`}>
						{data.title}
					</Link>
				</h2>
				<p className="place-card__type">{data.type}</p>
			</div>
		</div >
	);
};
