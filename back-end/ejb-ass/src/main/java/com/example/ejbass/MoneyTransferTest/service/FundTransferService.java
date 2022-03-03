package com.example.ejbasmtest.MoneyTransferTest.service;

import com.example.ejbasmtest.MoneyTransferTest.Dto.FundTransferDto;
import com.example.ejbasmtest.MoneyTransferTest.Dto.FundTransferRequestDto;
import com.example.ejbasmtest.MoneyTransferTest.Dto.FundTransferResponse;
import com.example.ejbasmtest.MoneyTransferTest.FundTransferEntity;
import com.example.ejbasmtest.MoneyTransferTest.FundTransferRepository;
import com.example.ejbasmtest.MoneyTransferTest.Mapper.FundTransferMapper;
import com.example.ejbasmtest.MoneyTransferTest.TransactionStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class FundTransferService {
    private final FundTransferRepository fundTransferRepository;

    private FundTransferMapper mapper = new FundTransferMapper();

    public FundTransferResponse fundTransfer(FundTransferRequestDto request) {
        log.info("Sending fund transfer request {}" + request.toString());

        FundTransferEntity entity = new FundTransferEntity();
        BeanUtils.copyProperties(request, entity);
        entity.setStatus(TransactionStatus.PENDING);
        FundTransferEntity optFundTransfer = fundTransferRepository.save(entity);

        FundTransferResponse fundTransferResponse = new FundTransferResponse();
        fundTransferResponse.setTransactionId(UUID.randomUUID().toString());
        fundTransferResponse.setMessage("Success");

        return fundTransferResponse;

    }

    public List<FundTransferDto> readAllTransfers(Pageable pageable) {
        return mapper.convertToDtoList(fundTransferRepository.findAll(pageable).getContent());
    }
}
